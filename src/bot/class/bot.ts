import { Client, ClientUser, Collection, Message } from "discord.js"
import { readdirSync } from "fs"
import { PartialCommandsFile } from "../interfaces"

class BotClient {
    public client: Client
    public commands: Collection<string, PartialCommandsFile>
    public aliases: Collection<string, PartialCommandsFile>
    public user: ClientUser | null
    public readonly prefix: string

    constructor(prefix: string) {
        this.client = new Client()
        this.commands = new Collection()
        this.aliases = new Collection()
        this.user = this.client.user
        this.prefix = prefix
    }

    ready(cb: () => Promise<void>) {
        this.client.on('ready', cb)
    }

    setCommand(path: string) {
        const cDir = readdirSync(path).filter(v => v.endsWith('.ts'))
        for (let file of cDir) {
            const command: PartialCommandsFile = require(`${path}/${file}`)
            this.commands.set(command.name, command)
            for (const aliase of command.aliases)
                this.aliases.set(aliase, command)
        }

        this.client.on('message', async (message: Message) => {
            if (message.author.bot) return
            if (!message.content.startsWith(this.prefix)) return
        
            const args: string[] = message.content.slice(this.prefix.length).trim().split(/ +/g)
            const cmd: string = String(args.shift()?.toLowerCase())
        
            if (cmd.length === 0) return 

            const command = this.commands.get(cmd)
            const aliasesCommand = this.aliases.get(cmd)
            if (command)
                command?.run(this.client, message, args)
            else
                aliasesCommand?.run(this.client, message, args)
        })
    }

    login(token: string): void {
        this.client.login(token)
    }
}

export default BotClient