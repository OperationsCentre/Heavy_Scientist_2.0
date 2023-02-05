const { ticket_closed } = require("../embeds/ticket_closed");
const { logger } = require("../webhooks/logger");
const fs = require("fs");
module.exports = {
  data: { name: "close-ticket-button" },
  async execute(interaction) {
    await interaction.reply({
      content: `Ticket is now closed!\n<#${interaction.channel.id}>`,
      ephemeral: true,
    });

    let log = "";

    await interaction.channel.messages.fetch().then((messages) => {
      messages.forEach(
        (msg) => (log = msg.author.username + ": " + msg.content + "\n" + log)
      );
    });

    let ticketFile = Date.now() + "ticket";

    fs.appendFile(
      "tickets/" + ticketFile + ".txt",
      log + "\n\n CLOSED BY: " + interaction.member.user.tag,
      function (err) {
        if (err)
          console.error("There was an error writing the the file\n" + err);
      }
    );

    await logger.send({
      embeds: [ticket_closed(interaction.member, ticketFile)],
    });

    interaction.channel.delete();
  },
};
