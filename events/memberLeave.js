const { Events } = require("discord.js");
const debug = require("../debug");
const { logger } = require("../webhooks/logger");
const { member_leave } = require("../embeds/member_leave");

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member) {
    logger.send({ embeds: [member_leave(member)] });
    debug.log(`${member.user.tag} has now left the server!`);
  },
};
