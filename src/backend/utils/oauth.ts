import DiscordOauth from "oauth-discord"
import { config } from "dotenv"

config()

const Oauth = new DiscordOauth({
    client_id: String(process.env.CLIENT_ID),
    client_secret: String(process.env.CLIENT_SECRET),
    redirect_uri: String(process.env.REDIREC_URI),
    version: 'v9'
})

export default Oauth