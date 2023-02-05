const debug = require("../debug");
const { guild_id, category } = require("../config/config.json");
const { ticket_category } = category;
const { rust_staff_role } = require("../config/config.json").roles;
const {
  ChannelType,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: { name: "support-ticket" },
  async execute(interaction) {
    debug.log(`Ticket Created by ${interaction.member.user.tag}`);

    const channel = await interaction.client.guilds.cache
      .get(guild_id)
      .channels.create({
        name: `ticket-${interaction.member.user.username}`,
        type: ChannelType.GuildText, //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        parent: ticket_category, //This is the category it is in
        permissionOverwrites: [
          {
            id: interaction.member.user.id, //To make it be seen by a certain role, user an ID instead
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ], //Allow permissions
          },
          {
            // same as before
            id: interaction.client.guilds.cache.get(guild_id).roles.everyone,
            deny: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ],
      });

    let issue = interaction.fields.getTextInputValue("issue");

    let closeTicketButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("close-ticket-button")
        .setLabel("Close Ticket")
        .setStyle(ButtonStyle.Primary)
      //.setEmoji(rust_role)
    );

    let msg = `Hello, ${interaction.member.user.toString()}. Thank you for contacting support. <@&${rust_staff_role}> have been contacted.\n`;

    channel.send({
      content: msg + "```" + issue + "```",
      components: [closeTicketButton],
    });

    interaction.reply({
      content: `Thank you for contacting support!\nWe have created you a ticket: ${channel.toString()}`,
      ephemeral: true,
    });
  },
};
