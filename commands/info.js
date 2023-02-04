const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { info } = require("../embeds/info");
const { getMemberFromId } = require("../libs/getMemberFromId");
const { query } = require("../libs/postgresql");
const { guild_id } = require("../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get's user info")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Which user do you want to query?")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageNicknames),
  async execute(interaction) {
    let targetUser = interaction.options.getUser("user");

    let targetMember = await getMemberFromId(
      targetUser.id,
      interaction.client.guilds.cache.get(guild_id)
    );

    let roles = "";

    if (targetMember._roles.length != 0)
      targetMember._roles.forEach((element) => {
        roles += "<@&" + element + ">";
      });
    else roles = "None";
    let queryString = `SELECT warnings FROM users WHERE user_id = ${targetUser.id};`;

    let result = (await query(queryString)).rows[0];
    let warnings = 0;
    if (result) warnings = result.warnings;

    interaction.reply({
      embeds: [info(targetMember, roles, warnings)],
    });
  },
};
