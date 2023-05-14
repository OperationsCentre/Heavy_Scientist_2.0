module.exports = {
  /**
   * Replies to an interaction
   * @param {Interaction} interaction - Interaction object
   * @param {string} message - Message to send
   * @param {boolean} ephemeral - Whether or not the message should be ephemeral
   * @returns {void}
   * @example
   * const interactionReply = require("./libs/interactionReply.js");
   * interactionReply(interaction, "Hello World!", false);
   * // Replies to the interaction with "Hello World!"
   */
  interactionReply(interaction, message, ephemeral) {
    interaction.reply({
      content: message,
      ephemeral: ephemeral,
    });
  },
};
