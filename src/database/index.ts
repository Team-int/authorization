import Mongoose from "mongoose"
import { config } from "dotenv"

config()

interface IToken {
    user: string
    guild: string
    token: string
    created_time: number
    exprise_time: number
}

interface IGuild {
    id: string
    role: string
}

export const connect = async (): Promise<void> => {
    if (!Mongoose.connection)
        await Mongoose.connect(String(process.env.DB_URI),  {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
}

export const TokenSchema = new Mongoose.Schema<IToken>({
    user: {
        type: String,
        required: true,
    },
    guild: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    created_time: {
        type: Number,
        required: true,
    },
    exprise_time: {
        type: Number,
        required: true,
    },
})

export const TokenModel: Mongoose.Model<IToken, {}, {}> = Mongoose.model<IToken>('token', TokenSchema)

export const GuildSchema = new Mongoose.Schema<IGuild>({
    id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

export const GuildModel: Mongoose.Model<IGuild, {}, {}> = Mongoose.model<IGuild>('guild', GuildSchema)