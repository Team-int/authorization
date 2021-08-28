import { GuildModel } from "../../../database";
import Router from "../../interfaces/router";

const CodeRouter: Router = {
    name: 'code',
    callback(fastify, opts, done) {
        fastify.post<{
            Body: {
                code: string
            }
        }>('/', async (req, res) => {
            try {
                const { code } = req.body

                const guild = await GuildModel.findOne({ code })

                if (!guild)
                    return res.code(404).send({
                        code: 404,
                        message: 'Not found!'
                    })
                
                return {
                    code: 200,
                    success: true,
                }

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

export default CodeRouter