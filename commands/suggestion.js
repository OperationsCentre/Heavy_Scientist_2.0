const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const fs = require("fs");

const suggestions_channel = require("../config/config.json").channels
  .suggestions_channel;

const suggestions_implemented_channel = require("../config/config.json")
  .channels.suggestions_implemented_channel;

async function approveSuggestion(
  interaction,
  suggestionsJson,
  suggestionIndex
) {
  if (!suggestionsJson.suggestions[suggestionIndex]) {
    interaction.reply({
      content: "No suggestion with the id provided exists.",
      ephemeral: true,
    });
    return;
  }

  if (suggestionsJson.suggestions[suggestionIndex].status != 0) {
    interaction.reply({
      content:
        suggestionsJson.suggestions[suggestionIndex].id +
        " cannot be approved as it has already been approved/rejected/implemented.",
      ephemeral: true,
    });
    return;
  } else if (suggestionsJson.suggestions[suggestionIndex].status == 0) {
    suggestionsJson.suggestions[suggestionIndex].status = 1;

    interaction.client.channels.cache
      .get(suggestions_channel)
      .messages.fetch(suggestionsJson.suggestions[suggestionIndex].messageId)
      .then((msg) => msg.delete());

    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Response:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has approved <@${
      suggestionsJson.suggestions[suggestionIndex].user.id
    }> suggestion.`;

    let dateApproved = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestamp = dateApproved;

    suggestionsJson.suggestions[suggestionIndex].dateApproved = dateApproved;

    let message = await interaction.client.channels.cache
      .get(suggestions_channel)
      .send({ embeds: [suggestionsJson.suggestions[suggestionIndex].embed] });

    suggestionsJson.suggestions[suggestionIndex].messageId = message.id;

    interaction.reply({
      content:
        suggestionsJson.suggestions[suggestionIndex].id + " has been approved!",
      ephemeral: true,
    });
    return;
  }
}

async function rejectSuggestion(interaction, suggestionsJson, suggestionIndex) {
  if (!suggestionsJson.suggestions[suggestionIndex]) {
    interaction.reply({
      content: "No suggestion with the id provided exists.",
      ephemeral: true,
    });
    return;
  }
  if (suggestionsJson.suggestions[suggestionIndex].status != 0) {
    interaction.reply({
      content:
        suggestionsJson.suggestions[suggestionIndex].id +
        " cannot be rejected as it has already been approved/rejected/implemented.",
      ephemeral: true,
    });
    return;
  } else if (suggestionsJson.suggestions[suggestionIndex].status == 0) {
    suggestionsJson.suggestions[suggestionIndex].status = -1;

    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has rejected your suggestion.`;

    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Response:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    let dateRejected = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestamp = dateRejected;

    suggestionsJson.suggestions[suggestionIndex].dateRejected = dateRejected;

    interaction.client.users
      .fetch(suggestionsJson.suggestions[suggestionIndex].user.id)
      .then((user) => {
        user.send({
          content: `Your suggestion has been rejected.`,
          embeds: [suggestionsJson.suggestions[suggestionIndex].embed],
        });
      });

    interaction.client.channels.cache
      .get(suggestions_channel)
      .messages.fetch(suggestionsJson.suggestions[suggestionIndex].messageId)
      .then((msg) => msg.delete());
  }

  interaction.reply({
    content:
      suggestionsJson.suggestions[suggestionIndex].id + " has been rejected.",
    ephemeral: true,
  });
}

async function implementedSuggestion(
  interaction,
  suggestionsJson,
  suggestionIndex
) {
  if (!suggestionsJson.suggestions[suggestionIndex]) {
    interaction.reply({
      content: "No suggestion with the id provided exists.",
      ephemeral: true,
    });
    return;
  }

  if (
    suggestionsJson.suggestions[suggestionIndex].status == -1 ||
    suggestionsJson.suggestions[suggestionIndex].status == 2
  ) {
    interaction.reply({
      content:
        suggestionsJson.suggestions[suggestionIndex].id +
        " cannot be implemented as it has been rejected or implemented.",
      ephemeral: true,
    });
    return;
  } else if (suggestionsJson.suggestions[suggestionIndex].status == 1) {
    suggestionsJson.suggestions[suggestionIndex].status = 2;

    interaction.client.channels.cache
      .get(suggestions_channel)
      .messages.fetch(suggestionsJson.suggestions[suggestionIndex].messageId)
      .then((msg) => msg.delete());

    suggestionsJson.suggestions[suggestionIndex].embed.fields.push({
      name: "Implemented:",
      value: "```" + interaction.options.getString("reason") + "```",
    });

    suggestionsJson.suggestions[
      suggestionIndex
    ].embed.description = `${interaction.member.user.toString()} has implemented <@${
      suggestionsJson.suggestions[suggestionIndex].user.id
    }> suggestion.`;

    let dateImplemented = new Date().toISOString();

    suggestionsJson.suggestions[suggestionIndex].embed.timestemp =
      dateImplemented;

    suggestionsJson.suggestions[suggestionIndex].dateImplemented =
      dateImplemented;

    let message = await interaction.client.channels.cache
      .get(suggestions_implemented_channel)
      .send({ embeds: [suggestionsJson.suggestions[suggestionIndex].embed] });

    suggestionsJson.suggestions[suggestionIndex].messageId = message.id;

    interaction.reply({
      content:
        suggestionsJson.suggestions[suggestionIndex].id +
        " has been implemented.",
      ephemeral: true,
    });
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

    fs.writeFile(
      "./suggestions/suggestions.json",
      JSON.stringify(suggestionsJson),
      function (err) {
        if (err) throw err;
      }
    );

    return;
  },
};
