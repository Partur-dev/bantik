import { Client } from 'discord.js'
import { env } from './utils.ts'

const DISCORD_TOKEN = env('DISCORD_TOKEN')
const DISCORD_CHANNEL_ID = env('DISCORD_CHANNEL_ID')
const DISCORD_EMOJI = env('DISCORD_EMOJI')

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
})

let lastMessageAuthorId: string | null = null
client.on('messageCreate', async (message) => {
  if (message.channel.id !== DISCORD_CHANNEL_ID) {
    return
  }

  if (
    message.content != DISCORD_EMOJI ||
    message.author.id === lastMessageAuthorId
  ) {
    await message.delete()
    return
  }

  lastMessageAuthorId = message.author.id
})

await client.login(DISCORD_TOKEN)
