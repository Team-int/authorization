import { FastifyPluginCallback } from "fastify";

export default interface Router {
    name: string
    callback: FastifyPluginCallback
}