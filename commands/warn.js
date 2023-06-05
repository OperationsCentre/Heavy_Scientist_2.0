const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { logger } = require("../webhooks/logger");
const { admin_id } = require("../config/config.json");
const { warn_user } = require("../embeds/warn_user");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns Selected User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Which user do you want to warn?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("What is the reason for this warning.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
  async execute(interaction) {
    // Gets target user and reason for warning.
    let targetUser = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");

    // Gets the warnings.json file.
    let warningsJson = JSON.parse(
      fs.readFileSync("./warnings/warnings.json", "utf8")
    );

    // If the user doesn't have any warnings, create a new object for them.
    if (!warningsJson[targetUser.id]) {
      warningsJson[targetUser.id] = {
        warnings: 1,
        reasons: "`" + reason + "`\n",
      };
    } // If the user does have warnings, add one to their warnings and add the reason to the reasons string.
    else {
      warningsJson[targetUser.id].warnings += 1;
      warningsJson[targetUser.id].reasons += "`" + reason + "`\n";
    }

    // Write the new warnings to the warnings.json file.
    fs.writeFile(
      "./warnings/warnings.json",
      JSON.stringify(warningsJson),
      function (err) {
        if (err) throw err;
        console.log("Successfully written warnings");
      }
    );

    // Reply to the user with a success message.
    interaction.reply({
      content: `You have successfully warned <@${targetUser.id}>`,
      ephemeral: true,
    });

    // Send the warning embed to the logger channel.
    logger.send({
      embeds: [
        warn_user(
          targetUser,
          interaction.member.user,
          warningsJson[targetUser.id].warnings,
          reason
        ),
      ],
    });

    // If the user has 3 or more warnings, ping the admins so they can take action.
    if (warningsJson[targetUser.id].warnings >= 3) {
      logger.send(
        `<@&${admin_id}>. <@${targetUser.id}> now has ${
          warningsJson[targetUser.id].warnings
        } warnings. Actions need to be taken! They have been warned for the following reasons:\n${
          warningsJson[targetUser.id].reasons
        }`
      );
    }
  },
};
