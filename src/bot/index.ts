import { Client } from "discord.js";


const client: Client = new Client()

client.on('ready', async () => {
    console.log(client.user?.tag)
})