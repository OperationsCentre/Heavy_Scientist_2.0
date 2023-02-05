// ************************************************************************* //
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { info } = require("../embeds/info");
const { getMemberFromId } = require("../libs/getMemberFromId");
const fs = require("fs");
const { guild_id } = require("../config/config.json");
// ************************************************************************* //

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
    // Gets target user
    let targetUser = interaction.options.getUser("user");

    // Gets target member
    let targetMember = await getMemberFromId(
      targetUser.id,
      interaction.client.guilds.cache.get(guild_id)
    );

    // If there are no roles, set to "None", otherwise add each to a string
    let roles = "";
    if (targetMember._roles.length > 0)
      targetMember._roles.forEach((element) => {
        roles += "<@&" + element + ">";
      });
    else roles = "None";

    let obj = JSON.parse(fs.readFileSync("./warnings/warnings.json", "utf8"));
    console.log(obj);

    // Sets warnings to 0 by default
    let warnings = obj[targetUser.id];
    if (!warnings) warnings = 0;
    else warnings = obj[targetUser.id].warnings;

    // Send reply
    interaction.reply({
      embeds: [info(targetMember, roles, warnings)],
    });
  },
};
