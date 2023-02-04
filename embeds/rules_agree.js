const { Embed, GuildMember } = require("discord.js");
const { colours } = require("../config/config.json");
module.exports = {
  /**
   *
   * @param {GuildMember} member
   * @returns {Embed}
   */
  rules_agree: function (member) {
    return {
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
      description: `<@${member.user.id}> had agreed to the rules`,
    };
  },
};
