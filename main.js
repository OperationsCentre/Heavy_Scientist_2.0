require("dotenv").config();
const debug = require("./debug");

const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  Events,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel],
});

const fs = require("fs");

client.commands = new Collection();
let commands = LoadCommands(fs, client);

//Once the bot is online
client.once(Events.ClientReady, async () => {
  debug.log("Heavy Scientist: Online!");

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        debug.log("Commands Registered Globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );
        debug.log("Commands Registered Locally");
      }
    } catch (err) {
      console.error(err);
    }
  })();
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      try {
        await command.execute(interaction, client);
      } catch (err) {
        interaction.reply({
          content:
            "An error occurred using this command. Please contact an administrator.",
          ephemeral: true,
        });
        console.error(err);
      }
    }
  } catch (err) {}
});

function LoadCommands(fs, client) {
  const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

  let commands = [];
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
  return commands;
}

client.login(process.env.TOKEN);
