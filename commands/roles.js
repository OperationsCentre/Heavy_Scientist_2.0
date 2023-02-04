const {
  SlashCommandBuilder,
  PermissionsBitField,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");
const { rust_role } = require("../embeds/rust_role");
const { cosmetic_roles } = require("../embeds/cosmetic_roles");
const { location_roles } = require("../embeds/location_roles");
const { rust_emoji } = require("../config/config.json").roles;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Sends role embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
  async execute(interaction) {
    const attachment1 = new AttachmentBuilder("./img/RolesTop.png");
    const attachment2 = new AttachmentBuilder("./img/RolesBottom.gif");

    let message = await interaction.reply({
      files: [attachment1],
      fetchReply: true,
    });

    //cosmetic roles here:
    let cosmeticButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("medjay-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1️⃣"),
      new ButtonBuilder()
        .setCustomId("spartans-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("2️⃣"),
      new ButtonBuilder()
        .setCustomId("immortals-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("3️⃣"),
      new ButtonBuilder()
        .setCustomId("centurion-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("4️⃣")
    );

    message = await message.reply({
      embeds: [cosmetic_roles],
      components: [cosmeticButtons],
      fetchReply: true,
    });

    //location roles here:

    let locationButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("na-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1️⃣"),
      new ButtonBuilder()
        .setCustomId("eu-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("2️⃣"),
      new ButtonBuilder()
        .setCustomId("row-button")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("3️⃣")
    );
    message = await message.reply({
      embeds: [location_roles],
      components: [locationButtons],
      fetchReply: true,
    });

    //Rust Role
    let rustButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("rust-button")
        .setLabel("Rusty Operations")
        .setStyle(ButtonStyle.Secondary)
      //.setEmoji(rust_role)
    );

    message = await message.reply({
      embeds: [rust_role],
      components: [rustButtons],
      fetchReply: true,
    });

    //sends bottom 2 images
    message.reply({ files: [attachment2] });
  },
};
