const { Events } = require("discord.js");
const debug = require("../debug");

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member) {
    debug.log(`${member.user.tag} has now left the server!`);
  },
};