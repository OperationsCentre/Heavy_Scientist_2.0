const { colours } = require("../config/config.json");
module.exports = {
  ticket_closed: function (member, stored) {
    let embed = {
      title: "Ticket Closed",
      description: `${member.toString()} closed the ticket. The ticket is now archived in ${stored}`,
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
