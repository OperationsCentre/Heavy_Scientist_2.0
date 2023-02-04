const { WebhookClient } = require("discord.js");
const { id, token } = require("../config/config.json").webhooks.greeter;
module.exports = {
  greeter: new WebhookClient({ id, token }),
};
