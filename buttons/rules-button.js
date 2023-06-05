const { member_role } = require("../config/config.json").roles;
const { rules_agree } = require("../embeds/rules_agree");
const { logger } = require("../webhooks/logger");
const { roles_channel } = require("../config/config.json").channels;
module.exports = {
  data: { name: "rules-button" },
  async execute(interaction) {
    // If the user has not agreed to the rules, give them the member role and send them a message
    if (!interaction.member.roles.cache.has(member_role)) {
      logger.send({ embeds: [rules_agree(interaction.member)] });
      interaction.member.roles.add(member_role);
      interaction.reply({
        content: `Thank you for agreeing to the rules! We look forward to seeing you in the chats. Get started by choosing some <#${roles_channel}>.`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: "You have already agreed to the rules!",
        ephemeral: true,
      });
    }
  },
};
