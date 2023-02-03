const { colours } = require("../config/config.json");
const moment = require("moment");
module.exports = {
  warn_user: function (member, roles, warnings) {
    return {
      color: colours.log_colour,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
      fields: [
        {
          name: "Date Created:",
          value: moment(member.user.createdAt).format("DD/MM/YYYY") + "",
          inline: true,
        },
        {
          name: "Date Joined:",
          value: moment.utc(member.joinedAt).format("DD/MM/YYYY") + "",
          inline: true,
        },
        {
          name: "Roles:",
          value: "" + roles,
        },
        {
          name: "Warnings:",
          value: "" + warnings,
        },
      ],
    };
  },
};
