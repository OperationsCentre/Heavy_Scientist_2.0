const { Events } = require("discord.js");
const debug = require("../debug");
const { createJoinPicture } = require("../libs/createJoinPicture");
const { greeter } = require("../webhooks/greeter");

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    const memberPicture = await createJoinPicture(member);
    greeter.send({
      content: `${member.user.toString()}`,
      files: [memberPicture],
    });
    debug.log(`${member.user.tag} has now joined the server!`);
  },
};
