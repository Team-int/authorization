import { Client } from "discord.js";

class BotClient {
    public token: string
    public client: Client

    constructor(token: string) {
        this.token = token
        this.client = new Client()
    
        
    }

    

    login(): void {
        this.client.login(this.token)
    }
}

export default BotClient