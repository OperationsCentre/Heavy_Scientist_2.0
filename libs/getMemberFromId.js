module.exports = {
  /**
   * Get member object from ID
   * @param {int} id
   * @returns {GuildMember} member object
   */
  getMemberFromId: function (id) {
    return guild.members.fetch(id);
  },
};
