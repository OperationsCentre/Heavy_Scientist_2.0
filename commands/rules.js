const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  PermissionsBitField,
} = require("discord.js");

const { rules } = require("../embeds/rules");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Sends Rules Embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("rules-button")
        .setLabel("Agree to rules")
        .setStyle(ButtonStyle.Primary)
    );

    const attachment1 = new AttachmentBuilder("./img/RulesTop.png");
    const attachment2 = new AttachmentBuilder("./img/RulesBottom.gif");

    await interaction.reply({
      files: [attachment1],
      embeds: [rules],
      components: [row],
    });
    interaction.followUp({ files: [attachment2] });
  },
};
