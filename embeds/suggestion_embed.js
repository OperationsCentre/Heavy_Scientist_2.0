const { colours } = require("../config/config.json");
module.exports = {
  suggestion_embed: function (member, suggestion, id) {
    let codeBlock = "```";
    let embed = {
      title: `Suggestion #${id}`,
      description: `${member.user.toString()} has made a suggestion!`,
      color: colours.log_colour,
      fields: [
        {
          name: "Suggestion:",
          value: `${codeBlock}${suggestion}${codeBlock}`,
        },
      ],
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };

    return embed;
  },
};
