const { Events } = require("discord.js");
const debug = require("../debug");
const { createJoinPicture } = require("../libs/createJoinPicture");
const { greeter } = require("../webhooks/greeter");
const { logger } = require("../webhooks/logger");
const { member_join } = require("../embeds/member_join");

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    const memberPicture = await createJoinPicture(member);
    greeter.send({
      content: `${member.user.toString()}`,
      files: [memberPicture],
    });
    logger.send({ embeds: [member_join(member)] });
    debug.log(`${member.user.tag} has now joined the server!`);
  },
};
