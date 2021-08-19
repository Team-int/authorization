import Mongoose from "mongoose"
import { config } from "dotenv"

config()

interface IGuild {
    id: string
    role: string
    code: string
}

export const connect = async (): Promise<void> => {
    if (!Mongoose.connection)
        await Mongoose.connect(String(process.env.DB_URI),  {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
}

export const GuildSchema = new Mongoose.Schema<IGuild>({
    id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
})

export const GuildModel: Mongoose.Model<IGuild, {}, {}> = Mongoose.model<IGuild>('guild', GuildSchema)