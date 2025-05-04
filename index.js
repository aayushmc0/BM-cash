const { Client, Intents } = require('discord.js');
const { token, prefix, ownerID } = require('./config.json');

// Creating a new client with proper intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.once('ready', () => {
  console.log('Bot is online!');
});

// Listening for messages
client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Check if the message starts with the command prefix
  if (!message.content.startsWith(prefix)) return;

  // Get the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Command logic
  if (command === 'bm cash') {
    message.reply(`💰 You have **1000** bananas! 🍌🎉💵`);
  }

  if (command === 'bm cf') {
    const amount = args[0] || 'all';
    message.reply(`🎲 You've placed a **${amount}** bet! 🔥💸`);
  }

  if (command === 'bm give') {
    const user = message.mentions.users.first();
    const amount = args[1];
    if (!user || !amount) return message.reply("❌ Please specify a user and amount!");
    message.reply(`💸 You gave **${user.tag}** **${amount}** bananas! 🍌🎉`);
  }

  if (command === 'bm agive') {
    if (message.author.id !== ownerID) return message.reply("❌ You don't have permission to use this command!");
    const user = message.mentions.users.first();
    const amount = args[1];
    if (!user || !amount) return message.reply("❌ Please specify a user and amount!");
    message.reply(`💰 You gave **${user.tag}** **${amount}** bananas (admin)! 🍌🎉`);
  }

  if (command === 'bm daily') {
    message.reply("⏳ **Wait a sec...** Loading your daily reward! 💸💰🎉");
    setTimeout(() => {
      message.reply(`✅ **You received 500 bananas**! 🍌🎉 \n🔥 Daily streak: **1 days** \n🗡️ Weapons created: **NaN** \n⏳ Next daily: **12h**`);
    }, 2000);
  }

  if (command === 'bm earn') {
    message.reply("💸 You earned **100** bananas today! 🍌🎉");
  }

  if (command === 'bm hunt') {
    message.reply("🎯 You went on a hunt and found **200** bananas! 🍌💥");
  }

  if (command === 'bm lootbox') {
    message.reply("🎁 You opened a lootbox and found **300** bananas! 🍌🎉");
  }

  if (command === 'bm bounty') {
    const user = message.mentions.users.first();
    const amount = args[1];
    if (!user || !amount) return message.reply("❌ Please specify a user and amount!");
    message.reply(`💥 You placed a bounty of **${amount}** bananas on **${user.tag}**! 🍌🎯`);
  }

  if (command === 'bm dance') {
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Please mention a user to dance with!");
    message.reply(`💃 **${user.tag}** is dancing with you! 🕺💃💥`);
  }

  if (command === 'bm disable all') {
    if (message.author.id !== ownerID) return message.reply("❌ You don't have permission to use this command!");
    message.reply("🚫 All BM commands have been disabled! ⚠️");
  }

  if (command === 'bm enable all') {
    if (message.author.id !== ownerID) return message.reply("❌ You don't have permission to use this command!");
    message.reply("✅ All BM commands have been enabled! 🎉");
  }

  if (command === 'bm help') {
    message.reply(`
      🔹 **BM Help** 🔹
      Use these commands to interact with the BM system! 🍌🎉

      **BM Commands:**
      💰 \`bm cash\` - Check your banana balance!
      🎲 \`bm cf <amount/all>\` - Bet your bananas!
      💸 \`bm give @user <amount>\` - Give bananas to another user!
      🎉 \`bm daily\` - Claim your daily reward!
      💥 \`bm earn\` - Earn bananas today!
      🎯 \`bm hunt\` - Go on a hunt for bananas!
      🎁 \`bm lootbox\` - Open a lootbox for bananas!
      💥 \`bm bounty @user <amount>\` - Place a bounty on someone!
      💃 \`bm dance @user\` - Dance with someone!
      
      **Admin Commands:**
      🔑 \`bm agive @user <amount>\` - Give bananas as an admin!
      🔒 \`bm disable all\` - Disable all BM commands (admin only)!
      ✅ \`bm enable all\` - Enable all BM commands (admin only)!
    `);
  }
});

client.login(token);
