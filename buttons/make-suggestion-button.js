const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: { name: "make-suggestion-button" },
  async execute(interaction) {
    await interaction.reply({
      content: "Thank you for your suggestion",
      ephemeral: true,
    });
  },
};
