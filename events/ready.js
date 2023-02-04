const { Events } = require("discord.js");
const debug = require("../debug");
const { status_list } = require("../config/config.json");

// SET BOT STATUS //
let today, dd, mm;

let globalClient = null;

async function status() {
  let client = globalClient;
  today = new Date();
  dd = String(today.getDate()).padStart(2, "0");
  mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

  if (dd == "01" && mm == "01") {
    client.user.setPresence({
      activities: [{ name: "Happy New Year" }],
    });
  } else if (dd == "25" && mm == "12") {
    client.user.setPresence({
      activities: [{ name: "Merry Christmas" }],
    });
  } else {
    let currentStatus = Math.floor(Math.random() * status_list.length);
    client.user.setPresence({
      activities: [{ name: status_list[currentStatus] }],
    });
    debug.log(`Status set to: ${status_list[currentStatus]}`);
  }

  setTimeout(status, 60000);
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    debug.log(`${client.user.tag} is now online!`);
    globalClient = client;
    status();
  },
};
