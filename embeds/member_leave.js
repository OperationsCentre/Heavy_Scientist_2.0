const { colours } = require("../config/config.json");
module.exports = {
  member_leave: function (member) {
    return {
      title: `${member.user.tag} left`,
      description: `<@${member.user.id}> has joined the server.`,
      color: colours.log_colour,
      author: {
        name: member.user.username + "#" + member.user.discriminator,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };
  },
};
