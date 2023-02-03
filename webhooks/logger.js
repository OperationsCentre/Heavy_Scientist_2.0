const { WebhookClient } = require("discord.js");
const { id, token } = require("../config/config.json").webhooks.logger;
module.exports = {
  logger: new WebhookClient({ id, token }),
};
