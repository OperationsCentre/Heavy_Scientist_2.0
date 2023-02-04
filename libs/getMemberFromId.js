module.exports = {
  /**
   * Get member object from ID
   * @param {int} id
   * @returns {Guild} member object
   */
  getMemberFromId: async function (id, guild) {
    return await guild.members.fetch(id);
  },
};
