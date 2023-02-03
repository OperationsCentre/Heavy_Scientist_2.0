module.exports = {
  /**
   * Removed role from member
   * @param {GuildMember} member - Member Object
   * @param {int} role - Role ID
   */
  removeRole: function (member, role) {
    logger.send(`Removed <@&${role.name}> from ${member.user.tag}`);
    member.roles.remove(role.id);
  },
};
