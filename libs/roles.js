const { logger } = require("../webhooks/logger");
const { giveRole, takeRole } = require("../embeds/role");

/**
 * Adds role to member
 * @param {GuildMember} member - Member Object
 * @param {int} role - Role ID
 */
function removeRole(member, role) {
  logger.send({ embeds: [takeRole(member, role)] });
  member.roles.remove(role);
}

/**
 * Adds role to member
 * @param {GuildMember} member - Member Object
 * @param {int} role - Role ID
 */
function addRole(member, role) {
  logger.send({ embeds: [giveRole(member, role)] });
  member.roles.add(role);
}

module.exports = {
  /**
   * Adds role to member
   * @param {Interaction} interaction - Interaction Object
   * @param {int} role - Role ID
   */
  toggleRole: function (interaction, role) {
    if (interaction.member.roles.cache.has(role)) {
      removeRole(interaction.member, role);
      interaction.reply({
        content: `You no longer have the <@&${role}> role`,
        ephemeral: true,
      });
    } else {
      addRole(interaction.member, role);
      interaction.reply({
        content: `You have been given the <@&${role}> role`,
        ephemeral: true,
      });
    }
  },
};
