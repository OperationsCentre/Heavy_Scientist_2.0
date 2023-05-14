const debug = require("../debug");

const fs = require("fs");

const { suggestion_embed } = require("../embeds/suggestion_embed");
const { logger } = require("../webhooks/logger");
const { sendMessage } = require("../libs/messageManagement");
const suggestions_channel = require("../config/config.json").channels
  .suggestions_channel;

module.exports = {
  data: { name: "suggestion-modal" },
  async execute(interaction) {
    debug.log(`Suggestion Created by ${interaction.member.user.tag}`);

    let suggestion = interaction.fields.getTextInputValue("suggestion");

    let suggestionsJson = JSON.parse(
      fs.readFileSync("./suggestions/suggestions.json", "utf8")
    );

    let dateCreated = new Date().toISOString();

    let embed = suggestion_embed(
      interaction.member,
      suggestion,
      suggestionsJson.metadata.number_of_suggestions
    );

    embed.timestamp = dateCreated;

    let message = sendMessage(interaction.client, suggestions_channel, {
      embeds: [embed],
    });

    logger.send({ embeds: [embed] });

    let suggestionObject = {
      id: suggestionsJson.metadata.number_of_suggestions,
      user: interaction.user,
      suggestion: suggestion,
      embed: embed,
      createdTimestamp: dateCreated,
      status: 0,
      messageId: message.id,
    };

    suggestionsJson.metadata.number_of_suggestions++;

    suggestionsJson.suggestions.push(suggestionObject);

    if (suggestionsJson.suggestions.length != 0) {
      fs.writeFile(
        "./suggestions/suggestions.json",
        JSON.stringify(suggestionsJson),
        function (err) {
          if (err) throw err;
        }
      );
    }

    interaction.reply({
      content: `Thank you for your suggestion! You can view your suggestion in <#${suggestions_channel}>`,
      ephemeral: true,
    });
  },
};
