require('dotenv').config();
require('./src/utils/mongoose/core/connect')

// requesitando módulos e funções importantes
const { Collection, MessageEmbed, Client } = require('discord.js');
const commands = require('./src/utils/handlers/commands');
const events = require('./src/utils/handlers/events');
const { readdirSync, readFileSync } = require('fs')
const AntiSpam = require('discord-anti-spam');
const c = require('colors')

// important params
const client = new Client;
require('./giveaways/core')(client)
client.embed = new MessageEmbed();
client.commands = new Collection;
global.emojis = require('./emojis.json')
client.configs = require('./baseConfigs.json')
global.antiSpam = new AntiSpam({
  warnThreshold: 3,
  muteThreshold: 5,
  kickThreshold: 8,
  banThreshold: 10,
  maxInterval: 1500,
  warnMessage: `${emojis.warn} | Hey {@user}, pare de spammar ou será punido!`,
  muteMessage: `${emojis.warn} | \`{user_tag}\` foi mutado\nMotivo: \*\*Spam\*\*`,
  kickMessage: `${emojis.warn} | \`{user_tag}\` foi kickado\nMotivo: \*\*Spam\*\*`,
  banMessage: `${emojis.warn} | \`{user_tag}\` foi banido\nMotivo: \*\*Spam\*\*`,
  maxDuplicatesWarning: 3,
  maxDuplicatesMute: 4,
  maxDuplicatesKick: 6,
  maxDuplicatesBan: 8,
  ignoredPermission: ["MANAGE_MESSAGES"],
  ignoreBots: true,
  ignoredMembers: [],
  muteRoleName: "Muted",
  removeMessages: true
})

// calling functions
commands(client, readdirSync('./src/commands'))
events(client, readdirSync('./src/events'))

// if has an error on discord
client.on('error', err => {
  console.error(c.magenta('[Discord]') + c.red(' ERROR: ') + err)
})

// login in discord
client.login(process.env.AUTH_TOKEN)