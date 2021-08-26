import Fastify from "fastify"
import { connect } from "../database"
import cors from "fastify-cors"
import APIRouter from "./router"

const PORT: number = Number(process.env.PORT) || 3000

const app = Fastify({
    logger: true,
})

app.register(cors)
app.register(APIRouter, { prefix: 'auth' })

connect().then(() => {
    app.listen(PORT, (err: Error, addr: string): void => {
        if (err) throw err
        console.log(`Listening on ${PORT}, ${addr}`)
    })
})