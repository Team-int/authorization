import Fastify from "fastify"
import { connect } from "../database"
import cors from "fastify-cors"
import APIRouter from "./router"

const PORT: number = Number(process.env.PORT)

const app = Fastify({
    logger: true,
})

app.register(cors)
app.register(APIRouter)

connect().then((): void => {
    app.listen(PORT, (err: Error, addr: string): void => {
        if (err) throw err
        console.log(`Listening on ${PORT}, ${addr}`)
    })
})