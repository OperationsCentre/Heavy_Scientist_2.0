const { WebhookClient } = require("discord.js");
module.exports = {
  logger: new WebhookClient({
    id: "1070842881985761391",
    token:
      "hzEmpxlXNrXkD2oNmKrG89PC1kAD-S9oYlZEVRoOx3Sj-iOSJzYspBGQbcOFV0pa0_rv",
  }),
  log: function (message) {
    let d = new Date();
    console.log(d.toLocaleString() + ": " + message);
    this.logger.send(d.toLocaleString() + ": " + message);
  },
};
