const { colours } = require("../config/config.json");
module.exports = {
  ticket_issue: function (member, issue) {
    let embed = {
      title: "Ticket Created",
      description: issue,
      color: colours.rust_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };

    return embed;
  },
};
