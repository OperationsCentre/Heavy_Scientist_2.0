const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  PermissionsBitField,
} = require("discord.js");

const { rules } = require("../embeds/rules");
const { rust_server } = require("../embeds/rust_server");

const { rust_role } = require("../embeds/rust_role");
const { cosmetic_roles } = require("../embeds/cosmetic_roles");
const { location_roles } = require("../embeds/location_roles");
const { support_ticket } = require("../embeds/support_ticket");
const { make_suggestion } = require("../embeds/make_suggestion");
const { rust_emoji } = require("../config/config.json").emojis;

async function sendRules(interaction) {
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
}

async function sendRoles(interaction) {
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
      .setEmoji(rust_emoji)
  );

  message = await message.reply({
    embeds: [rust_role],
    components: [rustButtons],
    fetchReply: true,
  });

  //sends bottom 2 images
  message.reply({ files: [attachment2] });
}

async function sendRust(interaction) {
  interaction.reply({ embeds: [rust_server] });
}

async function sendTicket(interaction) {
  const attachment1 = new AttachmentBuilder("./img/TicketsTop.png");
  const attachment2 = new AttachmentBuilder("./img/TicketsBottom.gif");

  let createTicketButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("create-ticket-button")
      .setLabel("Create Support Ticket")
      .setStyle(ButtonStyle.Primary)
  );
  await interaction.reply({
    files: [attachment1],
    embeds: [support_ticket],
    components: [createTicketButton],
  });

  interaction.followUp({ files: [attachment2] });
}

async function sendSuggestion(interaction) {
  //const attachment1 = new AttachmentBuilder("./img/TicketsTop.png");
  //const attachment2 = new AttachmentBuilder("./img/TicketsBottom.gif");

  let makeSuggestionButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("make-suggestion-button")
      .setLabel("Make a Suggestion")
      .setStyle(ButtonStyle.Primary)
  );
  await interaction.reply({
    //  files: [attachment1],
    embeds: [support_ticket],
    components: [makeSuggestionButton],
  });

  //interaction.followUp({ files: [attachment2] });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embeds")
    .setDescription("Sends Embed")
    .addSubcommand((subcommand) =>
      subcommand.setName("roles").setDescription("Sends Roles Embed")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("rules").setDescription("Sends Rules Embed")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("rust").setDescription("Sends Rust Embed")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ticket").setDescription("Sends Ticket Embed")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("suggestion").setDescription("Sends Ticket Embed")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
  async execute(interaction) {
    let option = interaction.options.getSubcommand();

    if (option === "roles") sendRoles(interaction);
    else if (option === "rules") sendRules(interaction);
    else if (option === "rust") sendRust(interaction);
    else if (option === "ticket") sendTicket(interaction);
    else if (option === "suggestion") sendSuggestion(interaction);
  },
};
