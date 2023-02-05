// ************************************************* //

require("dotenv").config();
const debug = require("./debug");
const path = require("path");
const { token, guild_id, client_id } = require("./config/config.json");

const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
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

// ************************************************* //

// LOAD EVENTS //
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// LOAD COMMANDS //
client.commands = createCollection("commands");

// REGISTER COMMANDS //
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
      body: commands,
    });
    debug.log("Commands Successfully Registered Locally");
  } catch (err) {
    debug.log(err);
  }
})();

// LOAD BUTTONS //
client.buttons = createCollection("buttons");

client.modals = createCollection("modals");

// LOAD NEW COLLECTION OF .js FILES
function createCollection(folder) {
  //Create new Collection
  let collection = new Collection();

  //Get commands path
  const collectionsPath = path.join(__dirname, folder);
  //Gets all files inside folder ending in .js
  const collectionFile = fs
    .readdirSync(collectionsPath)
    .filter((file) => file.endsWith(".js"));

  //For all files
  for (const file of collectionFile) {
    //Get location of file
    const filePath = path.join(collectionsPath, file);
    //Load file
    const item = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in item && "execute" in item) {
      collection.set(item.data.name, item);
    } else {
      debug.log(
        `[WARNING] The item at ${filePath} is missing a required "data" property.`
      );
    }
  }

  return collection;
}

client.login(token);
