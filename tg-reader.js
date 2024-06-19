// const { TelegramClient } = require('telegram')
// const { Telegraf } = require('telegraf')
// const { NewMessage } = require('telegram/events')
// const { session, apiId, apiHash, botToken } = require('./config')
// const { giga } = require('./giga')

// const bot = new Telegraf(botToken);

// bot.command('watch', (ctx) => {
//   const channelId = ctx.message.text.split(' ')[1]
//   ctx.reply(`Channel ID: ${channelId}`)
// });

const config = require("config");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Blob } = require("buffer");

const tgSession = config.get('TG_SESSION');
const tgApiId = config.get('TG_API_ID');
const tgApiHash = config.get('TG_API_HASH');

const session = new StringSession(tgSession);
const client = new TelegramClient(session, tgApiId, tgApiHash, {});

const getImage = async (m) => {
  if (m.media) {
    const buffer = await client.downloadMedia(m.media, { workers: 1 });

    return buffer;
  }
}

async function getUnreadMessages(channelId, limit = 10) {
  try {
    console.log('начинаем получать диалоги');

  const dialogs = await client.getDialogs({});
  const channel = dialogs.find((d) => d.entity.username === channelId);
  
  console.log('канал', channel.title);

  if (channel) {
    console.log('начинаем получать сообщения из канала');

    const messages = await client.getMessages(channel.entity, {
      limit, // limit: channel.unreadCount,
    });

    console.log('начинаем формировать ответ для карты');

    return await Promise.all(
      messages.filter((m) => m.message).map(async (m) => {
        const data = m.message.replace(/\n/g, '').split('>>');
  
        // const buff = Buffer.from([m.photo.fileReference]);
        // const blob = new Blob(m.photo.fileReference);
        // let blob;
  
        // if (m.media) {
        //   const buffer = await client.downloadMedia(m.media, {
        //       workers: 1,
        //   });
        //   blob = new Blob([buffer]);
        //   // console.log("result is", buffer);
        // }
        // const buff = Buffer.from(m.photo.fileReference);
        // const blob = new Blob([buff]);
  
        console.log('начинаем запрашивать буффер изображения');

        const buff = await getImage(m);
  
        // console.log(buff.toString('base64'));
  
        // const image = new Blob([buff]);
        // console.log(image.toDataURI);
  
        console.log('возвращаем point - ', m.id);

        return {
          id: m.id,
          title: data[1],
          coordinates: data[3],
          categories: data[5],
          image: buff.toString('base64')
        }
      })
    );
  } else {
    console.log('Channel has not been found')
  }
  } catch (err) {
    console.log(err);
  }
}

async function readChannelMessage() {
  try {
    console.log('начинаем подключаться к клиенту тг');

    await client.connect();

    const channelId = 'geo_map_data';

    console.log('начинаем получать сообщения');

    return await getUnreadMessages(channelId, 100);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readChannelMessage;

// // function watchNewMessages(channelId) {
// //   client.addEventHandler((event) => {
// //     console.log('new message', event.message.message)
// //   }, new NewMessage({ fromUsers: [channelId] }))
// // }

// async function getUnreadMessages(channelId, limit = 10) {
//   const dialogs = await client.getDialogs({})
//   const channel = dialogs.find((d) => d.entity.username === channelId);
  
//   if (channel) {
//     const messages = await client.getMessages(channel.entity, {
//       // limit: channel.unreadCount,
//       limit,
//     })
//     return messages.map((m) => m.message).join(' ')
//   } else {
//     console.log('Канал не найден')
//   }
// }

// ;(async function run() {
//   // const channel = 'whale_alert_io' // for_demo_api

//   // watchNewMessages(channel)

//   await client.connect()

//   bot.command('sum', async (ctx) => {
//     const [, channelId, ...task] = ctx.message.text.split(' ')
//     if (!channelId) {
//       return ctx.reply(`Вы не указали канал`)
//     }

//     const messagesString = await getUnreadMessages(channelId, 10)
//     const gigaResponse = await giga(messagesString, task.join(' '))
//     await ctx.reply(gigaResponse)
//   })

//   bot.launch()
// })()
