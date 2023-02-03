const { Events } = require("discord.js");
const debug = require("../debug");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    debug.log(`Event Executed`);
  },
};
