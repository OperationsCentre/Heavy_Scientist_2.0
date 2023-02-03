const { colours } = require("../config/config.json");
module.exports = {
  warn_user: function (targetUser, user) {
    return {
      title: "Member has been warned",
      description:
        targetUser.username +
        "#" +
        targetUser.discriminator +
        " has been warned.\nThey now have " +
        (numberOfWarnings + 1) +
        " warning(s).",
      color: colours.log_colour,
      author: {
        name: user.username + "#" + user.discriminator,
        url: user.displayAvatarURL(),
        icon_url: user.displayAvatarURL(),
      },
    };
  },
};
