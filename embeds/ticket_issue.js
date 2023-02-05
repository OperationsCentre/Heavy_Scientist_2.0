const { colours } = require("../config/config.json");
module.exports = {
  ticket_issue: function (member, issue) {
    let embed = {
      title: "Ticket Created",
      description: `${member.user.toString()} created a ticket for the following issue:\n${issue}`,
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };

    return embed;
  },
};
