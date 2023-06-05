const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: { name: "make-suggestion-button" },
  async execute(interaction) {
    // Create a modal with a single text input field.
    const supportModal = new ModalBuilder()
      .setCustomId("suggestion-modal")
      .setTitle("Make a Suggestion");

    // Create a text input field.
    const issue = new TextInputBuilder()
      .setCustomId("suggestion")
      .setLabel("What's your suggestion")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    const actionRow = new ActionRowBuilder().addComponents(issue);

    supportModal.addComponents(actionRow);

    await interaction.showModal(supportModal);
  },
};
