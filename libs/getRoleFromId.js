module.exports = {
  /**
   * Gets role from ID
   * @param {GuildMember} guild - Guild object
   * @param {int} role - Role ID
   * @returns {Role}- Role Object
   */
  getRoleFromId: function (guild, role) {
    return guild.roles.fetch(role);
  },
};
