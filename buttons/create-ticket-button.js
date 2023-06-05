const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: { name: "create-ticket-button" },
  async execute(interaction) {
    // Create a modal with a single text input field.
    const supportModal = new ModalBuilder()
      .setCustomId("support-ticket")
      .setTitle("Create a Ticket");

    // Create a text input field.
    const issue = new TextInputBuilder()
      .setCustomId("issue")
      .setLabel("What do you need help with?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    const actionRow = new ActionRowBuilder().addComponents(issue);

    supportModal.addComponents(actionRow);

    await interaction.showModal(supportModal);
  },
};
