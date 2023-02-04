const { Embed, GuildMember } = require("discord.js");
const { colours } = require("../config/config.json");
module.exports = {
  /**
   *
   * @param {GuildMember} member
   * @param {string} linkType
   * @returns {Embed}
   */
  link: function (member, linkType) {
    return {
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
      description: `<@${member.user.id}> requested the ${linkType} link`,
    };
  },
};
