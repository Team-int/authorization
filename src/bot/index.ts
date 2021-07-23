import { config } from "dotenv"
import BotClient from "./class/bot"

config()

const client = new BotClient(String(process.env.PREFIX))

client.ready(async () => {
    console.log('Login on', client.user?.tag)
})

client.setCommand('./commands')

client.login(String(process.env.TOKEN))