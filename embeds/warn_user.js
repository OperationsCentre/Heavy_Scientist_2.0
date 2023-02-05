const { colours } = require("../config/config.json");
module.exports = {
  warn_user: function (targetUser, user, warnings, reason) {
    let monospace = "`";
    return {
      title: `${targetUser.tag} has been warned`,
      description: `<@${targetUser.id}> has been warned for the following reason:\n${monospace}${reason}${monospace}\n\nThey now have ${warnings} warning(s)`,
      color: colours.log_colour,
      author: {
        name: user.username + "#" + user.discriminator,
        url: user.displayAvatarURL(),
        icon_url: user.displayAvatarURL(),
      },
    };
  },
};
