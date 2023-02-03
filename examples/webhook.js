const { WebhookClient } = require("discord.js");
const { id, token } = require("../config/config.json").webhooks;
module.exports = {
  webhook: new WebhookClient({ id, token }),
};
