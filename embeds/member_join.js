const { colours } = require("../config/config.json");
module.exports = {
  member_join: function (member) {
    return {
      title: `${member.user.tag} joined`,
      description: `<@${
        member.user.id
      }> has joined the server.\nAccount was created on: ${moment
        .utc(member.joinedAt)
        .format("DD/MM/YYYY")}.`,
      color: colours.log_colour,
      author: {
        name: member.user.username + "#" + user.discriminator,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };
  },
};
