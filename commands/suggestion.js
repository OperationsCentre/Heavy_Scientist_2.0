const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const { logger } = require("../webhooks/logger");

const suggestions_channel = require("../config/config.json").channels
  .suggestions_channel;

const suggestions_implemented_channel = require("../config/config.json")
  .channels.suggestions_implemented_channel;

const {
  sendMessage,
  deleteMessage,
  dmUser,
} = require("../libs/messageManagement");
const { interactionReply } = require("../libs/interactionReply");

// 0 = pending, 1 = approved, 2 = rejected, 3 = implemented

/**
 *
 * @param {Interaction} interaction
 * @param {Object} suggestionsJson
 * @param {Integer} suggestionIndex
 * @returns void
 */
async function approveSuggestion(
  interaction,
  suggestionsJson,
  suggestionIndex
) {
  // Check if suggestion is pending. If suggestion is pending, approve it. If not, send error message.
  if (suggestionsJson.suggestions[suggestionIndex].status != 0) {
    replyInteraction(
      interaction,
      suggestionsJson.suggestions[suggestionIndex].id +
        " cannot be approved as it has already been approved/rejected/implemented.",
      true
    );
    return;
  } else if (suggestionsJson.suggestions[suggestionIndex].status == 0) {
    suggestionsJson.suggestions[suggestionIndex].status = 1;

    await deleteMessage(
      interaction.client,
      suggestions_channel,
      suggestionsJson.suggestions[suggestionIndex].messageId
    );

    // Add response to embed
    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Response:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    // Add response to embed description to show who approved the suggestion
    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has approved <@${
      suggestionsJson.suggestions[suggestionIndex].user.id
    }> suggestion.`;

    let dateApproved = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestamp = dateApproved;

    suggestionsJson.suggestions[suggestionIndex].dateApproved = dateApproved;

    // Send message to suggestions channel
    let message = await sendMessage(interaction.client, suggestions_channel, {
      embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
    });

    logger.send({
      embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
    });

    suggestionsJson.suggestions[suggestionIndex].messageId = message.id;

    interactionReply(
      interaction,
      `Suggestion ${suggestionsJson.suggestions[suggestionIndex].id} has been approved!`,
      true
    );
    return;
  }
}
// Reject suggestion
async function rejectSuggestion(interaction, suggestionsJson, suggestionIndex) {
  // Check if suggestion is pending. If suggestion is pending, reject it. If not, send error message.
  if (suggestionsJson.suggestions[suggestionIndex].status != 0) {
    interactionReply(
      interaction,
      `Suggestion ${suggestionsJson.suggestions[suggestionIndex].id} cannot be rejected as it has already been approved/rejected/implemented.`,
      true
    );
    return;
  } else if (suggestionsJson.suggestions[suggestionIndex].status == 0) {
    // Set status to rejected
    suggestionsJson.suggestions[suggestionIndex].status = -1;

    // Set embed description to rejected
    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has rejected your suggestion.`;

    // Add response to embed
    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Response:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    let dateRejected = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestamp = dateRejected;

    suggestionsJson.suggestions[suggestionIndex].dateRejected = dateRejected;

    // Send message to user to notify them that their suggestion has been rejected.
    dmUser(
      interaction.client,
      suggestionsJson.suggestions[suggestionIndex].user.id,
      {
        content: `Your suggestion has been rejected.`,
        embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
      }
    );

    logger.send({
      embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
    });

    deleteMessage(
      interaction.client,
      suggestions_channel,
      suggestionsJson.suggestions[suggestionIndex].messageId
    );
  }

  interactionReply(
    interaction,
    `Suggestion ${suggestionsJson.suggestions[suggestionIndex].id} has been rejected.`,
    true
  );
}

// Implement suggestion
async function implementedSuggestion(
  interaction,
  suggestionsJson,
  suggestionIndex
) {
  // Check if suggestion is pending or approved. If suggestion is pending or approved, implement it. If not, send error message.
  if (
    suggestionsJson.suggestions[suggestionIndex].status == -1 ||
    suggestionsJson.suggestions[suggestionIndex].status == 2
  ) {
    interactionReply(
      interaction,
      `Suggestion ${suggestionsJson.suggestions[suggestionIndex].id} cannot be rejected as it has already been rejected/implemented.`,
      true
    );
    return;
  } else if (
    suggestionsJson.suggestions[suggestionIndex].status == 1 ||
    suggestionsJson.suggestions[suggestionIndex].status == 0
  ) {
    // Set status to implemented
    suggestionsJson.suggestions[suggestionIndex].status = 2;

    deleteMessage(
      interaction.client,
      suggestions_channel,
      suggestionsJson.suggestions[suggestionIndex].messageId
    );

    // Add implemented reason to embed
    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Implemented:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    // Modify embed description to show who implemented the suggestion
    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has implemented <@${
      suggestionsJson.suggestions[suggestionIndex].user.id
    }> suggestion.`;

    let dateImplemented = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestamp =
      dateImplemented;

    suggestionsJson.suggestions[suggestionIndex].dateImplemented =
      dateImplemented;

    // Send embed to suggestions-implemented channel
    let message = await sendMessage(
      interaction.client,
      suggestions_implemented_channel,
      { embeds: [suggestionsJson.suggestions[suggestionIndex].embed] }
    );

    logger.send({
      embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
    });

    suggestionsJson.suggestions[suggestionIndex].messageId = message.id;

    interactionReply(
      interaction,
      `Suggestion ${suggestionsJson.suggestions[suggestionIndex].id} has been implemented.`,
      true
    );
    return;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggestion Commands")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("approve")
        .setDescription("Approve a Suggestion")
        .addIntegerOption((option) =>
          option
            .setName("id")
            .setDescription("The ID of the suggestion")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason you approved the suggestion")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reject")
        .setDescription("Reject a Suggestion")
        .addIntegerOption((option) =>
          option
            .setName("id")
            .setDescription("The ID of the suggestion")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason you rejected the suggestion")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("implemented")
        .setDescription("Has a suggestion been implemented?")
        .addIntegerOption((option) =>
          option
            .setName("id")
            .setDescription("The ID of the suggestion")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason you implemented the suggestion")
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
  async execute(interaction) {
    let option = interaction.options.getSubcommand();

    let suggestionsJson = JSON.parse(
      fs.readFileSync("./suggestions/suggestions.json", "utf8")
    );

    let suggestionIndex = suggestionsJson.suggestions.findIndex(
      (item) => item.id == interaction.options.getInteger("id")
    );

    if (!suggestionsJson.suggestions[suggestionIndex]) {
      interactionReply(
        interaction,
        "No suggestion with the id provided exists.",
        true
      );
      return;
    }

    if (option === "approve")
      await approveSuggestion(interaction, suggestionsJson, suggestionIndex);
    else if (option === "reject")
      await rejectSuggestion(interaction, suggestionsJson, suggestionIndex);
    else if (option === "implemented")
      await implementedSuggestion(
        interaction,
        suggestionsJson,
        suggestionIndex
      );

    // Write to suggestions.json if there are any suggestions left to stop the file from being empty.
    if (suggestionsJson.suggestions.length != 0) {
      fs.writeFile(
        "./suggestions/suggestions.json",
        JSON.stringify(suggestionsJson),
        function (err) {
          if (err) throw err;
        }
      );
    }

    return;
  },
};
