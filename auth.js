const { TelegramClient } = require('telegram')
const input = require('input')
const { StringSession } = require('telegram/sessions');
const config = require('config');

const tgSession = config.get('TG_SESSION');
const tgApiId = config.get('TG_API_ID');
const tgApiHash = config.get('TG_API_HASH');
const session = new StringSession(tgSession);

(async () => {
  console.log('Loading interactive example...')
  const client = new TelegramClient(session, tgApiId, tgApiHash, {
    connectionRetries: 5,
  })
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () =>
      await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  })
  console.log('You should now be connected.')
  console.log(client.session.save())
})()
