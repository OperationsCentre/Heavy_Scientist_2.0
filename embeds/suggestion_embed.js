const { colours } = require("../config/config.json");
module.exports = {
  suggestion_embed: function (member, suggestion, response, admin, id) {
    let codeBlock = "```";
    let fields = null;
    if (!response) {
      fields = [
        {
          name: "Suggestion:",
          value: `${codeBlock}${suggestion}${codeBlock}`,
        },
      ];
    } else {
      fields = [
        {
          name: "Suggestion:",
          value: `${codeBlock}${suggestion}${codeBlock}`,
        },
        {
          name: `Response from ${admin.user.toString()}:`,
          value: `${codeBlock}${suggestion}${codeBlock}`,
        },
      ];
    }
    let embed = {
      title: `Suggestion #${id}`,
      description: `${member.user.toString()} has made a suggestion!`,
      color: colours.log_colour,
      fields,
      author: {
        name: member.user.username,
        url: member.user.displayAvatarURL(),
        icon_url: member.user.displayAvatarURL(),
      },
    };

    return embed;
  },
};
