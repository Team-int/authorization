import Router from "../../interfaces/router";
import Oauth from "../../utils/oauth";
import btoa from "btoa"

const DiscordRouter: Router = {
    name: 'discord',
    callback(fastify, opts, done) {
        fastify.get<{
            Querystring: {
                code: string
            }
        }>('/', async (req, res) => {
            try {
                const { code } = req.query

                if (!code)
                    return res.code(401).send({
                        code: 401,
                        message: 'You should put discord code'
                    })
                
                const token = await Oauth.getToken({
                    grant_type: 'authorization_code',
                    code,
                })

                if (!token)
                    return res.code(401).send({
                        code: 401,
                        message: 'Unable to use code'
                    })
                    
                return {
                    code: 200,
                    refresh_token: btoa(token.refresh_token)
                }
            } catch (e) {
                return res.code(400).send({
                    code: 400,
                    message: String(e)
                })
            }
        })
    }
}

export default DiscordRouter