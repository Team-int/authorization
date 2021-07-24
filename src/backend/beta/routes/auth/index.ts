import { FastifyPluginCallback } from "fastify";
import VerifyRoute from "./verify";

const AuthRoute: FastifyPluginCallback = async (fastify, opts, done) => {
    fastify.register(VerifyRoute, { prefix: '/verify'})
    
    done()
}

export default AuthRoute