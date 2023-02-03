module.exports = {
  /**
   * Gets role from ID
   * @param {*} guild - Guild object
   * @param {*} role - Role ID
   * @returns - Role Object
   */
  getRoleFromId: function (guild, role) {
    return guild.roles.cache.get(role);
  },
};
