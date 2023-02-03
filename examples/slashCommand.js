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
    interaction.reply({
      content: "Pong!",
    });
  },
};
