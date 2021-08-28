import { Guild } from "discord.js";
import { GuildModel } from "../../../database";
import client from "../../bot";
import Router from "../../interfaces/router";
import Oauth from "../../utils/oauth";
import axios from "axios"
import atob from "atob"

const VerifyRouter: Router = {
    name: 'verifiy',
    callback(fastify, opts, done) {
        fastify.post<{
            Body: {
                code: string,
                refresh_token: string,
                captcha_token: string
            }
        }>('/', async (req, res) => {
            try {
                const { code, refresh_token, captcha_token } = req.body

                const captcha_res = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
                    secret: process.env.CAPTCHA_SECRET,
                    response: captcha_token,
                })

                if (!captcha_res.data.success)
                    return res.code(401).send({
                        code: 401,
                        message: 'recaptcha doesn`t verify'
                    })
                
                if (!code || !refresh_token)
                    return res.code(401).send({
                        code: 401,
                        message: 'You should put refresh_token and code'
                    })
                
                const guild = await GuildModel.findOne({
                    code
                })

                if (!guild)
                    return res.code(404).send({
                        code: 404,
                        message: 'guild code not found!'
                    })
                
                if (!guild.role || !guild.id)
                    return res.code(404).send({
                        code: 404,
                        message: 'guild role not set!'
                    })

                const token = await Oauth.getToken({
                    grant_type: 'refresh_token',
                    refresh_token: atob(refresh_token)
                })
                
                if (!token || !token.access_token)
                    return res.code(401).send({
                        code: 401,
                        message: 'access token error!'
                    })
                
                const guildUser = await Oauth.user(token.access_token)
                const userGuilds = await Oauth.userGuilds(token.access_token)
                const targetGuild = userGuilds
                .find(g => g.id === guild.id)

                if (!targetGuild || !guildUser)
                    return res.code(404).send({
                        code: 404,
                        message: 'target guild or target user not found!'
                    })

                const botTargetGuild = await client.guilds.fetch(guild.id)
                
                if (!(botTargetGuild instanceof Guild))
                    return res.code(404).send({
                        code: 404,
                        message: 'target guild not found!'
                    })

                if (!botTargetGuild.me?.permissions.has('MANAGE_ROLES'))
                    return res.code(401).send({
                        code: 401,
                        message: 'the bot doesn`t have permission'
                    })
                
                const targetRole = await botTargetGuild.roles.fetch(guild.role)

                if (!targetRole)
                    return res.send(404).send({
                        code: 404,
                        message: 'target role not found'
                    })

                const botTargetMember = await botTargetGuild.members.fetch(guildUser.id)
                botTargetMember.roles.add(targetRole)
                Oauth.revokeToken(token.access_token)

                return res.code(200).send({
                    code: 200,
                    success: true,
                    message: 'Verified successfully'
                })
            } catch (e) {
                return res.code(400).send({
                    code: 400,
                    message: String(e)
                })
            }
        })
        done()
    }
}

export default VerifyRouter