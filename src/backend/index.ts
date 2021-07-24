import Fastify from "fastify"
import { connect } from "../database"

const PORT: number = Number(process.env.PORT)

const app = Fastify({
    logger: true,
})

connect().then((): void => {
    app.listen(PORT, (err: Error, addr: string): void => {
        if (err) throw err
        console.log(`Listening on ${PORT}, ${addr}`)
    })
})