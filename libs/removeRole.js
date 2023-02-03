module.exports = {
  /**
   * Removed role from member
   * @param {*} member - Member Object
   * @param {*} role - Role ID
   */
  removeRole: function (member, role) {
    logger.send(`Removed <@&${role.name}> from ${member.user.tag}`);
    member.roles.remove(role.id);
  },
};
