import { GuildModel } from "../../../database";
import Router from "../../interfaces/router";
import Oauth from "../../utils/oauth";

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
                
                const token = await Oauth.getToken({
                    grant_type: 'refresh_token',
                    refresh_token
                })
                
                if (!token || !token.access_token)
                    return res.code(404).send({
                        code: 404,
                        message: 'access token error!'
                    })
                
                
            } catch (e) {
                return res.code(400).send({
                    code: 400,
                    message: String(e)
                })
            }
        })
    }
}

export default VerifyRouter