const { SlashCommandBuilder } = require("discord.js");
const { join_link, vote_link } = require("../config/config.json");
const { logger } = require("../webhooks/logger");
const { link } = require("../embeds/link");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rust")
    .setDescription("Sends Rust Embed and Link")
    .addSubcommand((subcommand) =>
      subcommand.setName("join").setDescription("DMs Rust Server Join Link")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("vote").setDescription("DMs Rust Server Vote Link")
    ),
  async execute(interaction) {
    // Gets the subcommand
    let option = interaction.options.getSubcommand();

    // If the subcommand is join, send the join link and log it.
    if (option === "join") {
      // DMs join link to the user.
      interaction.member.user.send(join_link);
      // Sends a notification to the log channel to alert admins.
      logger.send({ embeds: [link(interaction.member, option)] });
      interaction.reply({
        content: "We have send you the join link. Check your DMs",
        ephemeral: true,
      });
      // If the subcommand is vote, send the vote link and log it.
    } else if (option === "vote") {
      // DMs vote link to the user.
      interaction.member.user.send(vote_link);
      // Sends a notification to the log channel to alert admins.
      logger.send({ embeds: [link(interaction.member, option)] });
      interaction.reply({
        content: "We have send you the vote link. Check your DMs",
        ephemeral: true,
      });
    }
  },
};
