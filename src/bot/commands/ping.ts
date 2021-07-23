import { MessageEmbed } from "discord.js";
import { PartialCommandsFile } from "../interfaces";

const pingCommand: PartialCommandsFile = {
    name: 'ping',
    description: 'show bot`s ping',
    aliases: ['vld', '핑'],
    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setAuthor('ping')
            .addField('Latency', `${message.createdTimestamp - Date.now()} ms`)
            .addField('API Latency', client.ws.ping)
            .setTimestamp()
        
        message.channel.send(embed)
    }
}

export default pingCommand