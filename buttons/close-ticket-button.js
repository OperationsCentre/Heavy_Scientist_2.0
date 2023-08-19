const { ticket_closed } = require("../embeds/ticket_closed");
const { logger } = require("../webhooks/logger");
const debug = require("../debug");
const fs = require("fs");
module.exports = {
  // Name of this command. Required for all commands.
  data: { name: "close-ticket-button" },
  async execute(interaction) {
    // Tell the user that the ticket is now closed
    await interaction.reply({
      content: `Ticket is now closed!\n<#${interaction.channel.id}>`,
      ephemeral: true,
    });

    let log = "";

    // Fetch all messages in the channel and log them to a file
    await interaction.channel.messages.fetch().then((messages) => {
      messages.forEach(
        (msg) => (log = msg.author.username + ": " + msg.content + "\n" + log)
      );
    });

    // get the current time and use it as the file name
    let ticketFile = Date.now() + "ticket";

    // write the log to a file
    fs.writeFile(
      "tickets/" + ticketFile + ".txt",
      log + "\n\n CLOSED BY: " + interaction.member.user.tag,
      function (err) {
        if (err)
          console.error("There was an error writing the the file\n" + err);
      }
    );

    // send a message to the log channel with the log filename attached
    await logger.send({
      embeds: [ticket_closed(interaction.member, ticketFile)],
    });

    // log to the console
    debug.log(`Ticket Closed by ${interaction.member.user.tag}`);

    interaction.channel.delete();
  },
};
