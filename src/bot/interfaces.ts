import { Client, Message } from "discord.js";

export interface PartialCommandsFile {
    name: string
    description: string
    aliases: string[]
    run(client: Client, message: Message, args: string[]): Promise<void> | Promise<any>
}