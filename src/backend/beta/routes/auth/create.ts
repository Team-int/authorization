import { FastifyPluginCallback } from "fastify"
import DiscordOauth from "oauth-discord"
import { config } from "dotenv"
import { v4 as generateCode } from "uuid"
import { TokenModel } from "../../../../database"

config()

interface BodyInterface {
    code: string
}

const Oauth = new DiscordOauth({
    version: 'v8',
    client_id: String(process.env.CLIENT_ID),
    client_secret: String(process.env.CLIENT_SECRET),
    redirect_uri: String(process.env.REDIRECT_URI),
})

const VerifyRoute: FastifyPluginCallback = async (fastify, opts, done) => {
    fastify.post<{
        Body: BodyInterface
    }>('/', async (req, res) => {
        try {
            const { code } = req.body

            if (!code)
                return res.status(401).send({
                    code: 401,
                    message: 'Missing body parameter'
                })
            
            const discordToken = await Oauth.getToken({
                grant_type: 'authorization_code',
                code,
            })
            const user = await Oauth.user(discordToken.access_token)

            let token: string = generateCode()
            for (let i = 0; i < 10; i--) {
                const tDoc = await TokenModel.findOne({token})
                if (!tDoc) break
                token = generateCode()
            }
            
            const newToken = new TokenModel({
                user: user.id
            })
        } catch (e) {
            return res.status(400).send({
                code: 400,
                message: String(e)
            })
        }
    })
    
    done()
}

export default VerifyRoute