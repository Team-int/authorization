import { FastifyPluginCallback } from "fastify";

interface BodyInterface {
    asdf: string
}

const VerifyRoute: FastifyPluginCallback = async (fastify, opts, done) => {
    fastify.post<{
        Body: BodyInterface
    }>('/', async (req, res) => {
        req.body.asdf
    })
    
    done()
}

export default VerifyRoute