const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { testEmbed } = require("../embeds/testEmbed");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong"),
  async execute(interaction) {
    let buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("testbutton")
        .setLabel("Click me!")
        .setStyle(ButtonStyle.Primary)
    );

    interaction.reply({
      content: "Pong!",
      embeds: [testEmbed],
      components: [buttons],
    });
  },
};
