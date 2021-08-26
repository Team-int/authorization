import { FastifyPluginCallback } from "fastify";
import { readdirSync } from "fs";
import Router from "../interfaces/router";

const APIRouter: FastifyPluginCallback = (fastify, opts, done) => {
    const routers = readdirSync('./router/auth/') // 왜 이렇게 되는건지는 모르겠지만 이렇게됨 그리고 이렇게 해야됨 야발

    for (const routeName of routers) {
        const router: Router = require(`${__dirname}/auth/${routeName}`).default
        fastify.register(router.callback, { prefix: router.name })
    }
    
    done()
}

export default APIRouter