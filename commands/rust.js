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
    let option = interaction.options.getSubcommand();
    if (option === "join") {
      interaction.member.user.send(join_link);
      logger.send({ embeds: [link(interaction.member, option)] });
      interaction.reply({
        content: "We have send you the join link. Check your DMs",
        ephemeral: true,
      });
    } else if (option === "vote") {
      interaction.member.user.send(vote_link);
      logger.send({ embeds: [link(interaction.member, option)] });
      interaction.reply({
        content: "We have send you the vote link. Check your DMs",
        ephemeral: true,
      });
    }
  },
};
