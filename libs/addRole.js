const { logger } = require("../webhooks/logger");
module.exports = {
  /**
   * Adds role to member
   * @param {GuildMember} member - Member Object
   * @param {int} role - Role ID
   */
  addRole: function (member, role) {
    logger.send(`Given <@&${role.name}> to ${member.user.tag}`);
    member.roles.add(role.id);
  },
};
