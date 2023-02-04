const { colours } = require("../config/config.json");
module.exports = {
  /**
   *
   * @param {GuildMember} member
   * @param {string} role
   * @returns
   */
  giveRole: function (member, role) {
    return {
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
      description: `Given <@${member.user.id}> the <@&${role}> role`,
    };
  },
  /**
   *
   * @param {GuildMember} member
   * @param {string} role
   * @returns
   */
  takeRole: function (member, role) {
    return {
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
      description: `Removed the <@&${role}> role from <@${member.user.id}>`,
    };
  },
};
