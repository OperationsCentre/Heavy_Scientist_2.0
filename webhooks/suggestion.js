const { WebhookClient } = require("discord.js");
const { id, token } = require("../config/config.json").webhooks.suggestion;
module.exports = {
  suggestionWebhook: new WebhookClient({ id, token }),
};
