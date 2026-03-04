const { 
  Client, 
  GatewayIntentBits, 
  SlashCommandBuilder,
  Routes,
  REST 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const token = process.env.BOT_TOKEN;

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!")
      .toJSON()
  ];

  const rest = new REST({ version: '10' }).setToken(token);

  await rest.put(
    Routes.applicationGuildCommands(client.user.id, "1476180028608876621"),
    { body: commands }
  );

  console.log("Slash command registered.");
});

client.on("guildMemberAdd", async (member) => {
  try {
    await member.roles.add("1478415573955383428");

    const channel = member.guild.channels.cache.get("1478415971915010100");

    if (channel) {
      channel.send(
        `مرحبا ${member} 👋\n` +
        `تم إعطاؤك رول <@&1478415573955383428>\n` +
        `الرجاء التواصل مع <@&1478417838145405052> من أجل التفعيل.`
      );
    }

  } catch (err) {
    console.log(err);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }
});

client.login(token);
