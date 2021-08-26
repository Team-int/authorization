import { Client, GuildChannel, Intents, MessageEmbed, Role } from "discord.js"
import { config } from "dotenv"
import { v4 as generateCode } from "uuid"
import { GuildModel } from "../../database"

config()

const client = new Client({ intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS
]})

client.on('ready', cln => {
    // client.application?.commands.create({
    //     name: 'set-up',
    //     description: '인증을 설정(?) 합니다',
    //     options: [{
    //         type: 'ROLE',
    //         name: 'role',
    //         description: '인증을 했을 때 유저에게 줄 역할을 선택하세요!',
    //         required: true,
    //     },{
    //         type: 'CHANNEL',
    //         name: 'channel',
    //         description: '인증을 알려줄 채널을 여기에 적어주세요!',
    //         required: true,
    //     }]
    // })
    console.log(cln.user.tag)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand())   return
    const channel = interaction.options.get('channel', true).channel
    const role = interaction.options.get('role', true).role

    if (!role) return interaction.reply('역할이 뭔가 이상하네요!')
    if (!channel)   return interaction.reply('채널이 뭔가 이상하네요!')
    if (!(channel instanceof GuildChannel)) return interaction.reply('채널이 뭔가 이상하네요!')
    if (!channel.isText())  return interaction.reply('선택된 채널은 텍스트 채널이여야만 해요!')

    if (interaction.commandName == 'set-up') {
        let code: string = generateCode()
        for (let i = 0; i <= 15; i--) {
            const __cg = await GuildModel.findOne({code})
            if (!__cg) break
        }
        const guild = new GuildModel({
            code,
            id: interaction.guildId,
            role: role?.id
        })
        await guild.save()
        const embed = new MessageEmbed()
            .setAuthor('아래 링크로 들어가서 인증을 완료해주세요!')
            .setDescription(`${process.env.FRONTEND_URL}/auth/code/${code}`)
            .setTimestamp()
        channel.send({ embeds: [embed] })
        interaction.reply('설정을 완료했어요!')
    }
})

client.login(process.env.TOKEN)

export default client