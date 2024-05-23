const TelegramBot = require('node-telegram-bot-api');

const token = '7162098197:AAGf7KDm5vGPG3k_TFn0at5Z2reFtl1Ofl4'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.log('Polling error:', error.message);
  // Handle the error, e.g., try to reconnect or log the error
});

bot.on('message', (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const firstName = msg.chat.first_name;
    const lastName = msg.chat.last_name;
    const fullName = `${firstName} ${lastName}`;
    const userId = msg.chat.id;
    const userName = msg.chat.username;

    if (messageText === '/start') {
      const gameStartButton = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Start Game', callback_data: 'start_game' }]
          ]
        })
      };

      bot.sendMessage(chatId, `Welcome, [${fullName}]! Your Telegram ID is [${userId}]. Would you like to start a game?`, gameStartButton);
    }
  } catch (error) {
    console.error('Error handling message:', error);
    // Handle the error, e.g., log the error or send a fallback message to the user
  }
});

bot.on('callback_query', (query) => {
  try {
    const chatId = query.message.chat.id;
    const callbackData = query.data;
    const firstName = query.message.chat.first_name;
    const lastName = query.message.chat.last_name;
    const fullName = `${firstName} ${lastName}`;
    const userId = query.message.chat.id;
    const userName = query.message.chat.username;

    if (callbackData === 'start_game') {
      const img = './Capture.JPG';
      bot.sendPhoto(chatId, img, { caption: 'Enjoy Together!!!' });
      bot.sendMessage(chatId, 'Game started!');
      console.log(`Sending message to backend: chatId=${chatId}, fullName=${fullName}, userId=${userId}, userName=${userName}`);
    }
  } catch (error) {
    console.error('Error handling callback query:', error);
    // Handle the error, e.g., log the error or send a fallback message to the user
  }
});
