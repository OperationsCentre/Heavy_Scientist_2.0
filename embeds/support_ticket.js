const { colours } = require("../config/config.json");
module.exports = {
  support_ticket: {
    title: "Create a Support Ticket",
    description:
      "Click relevant button to create a ticket and get in contact with the appropriate team!",
    color: colours.rust_colour,
    fields: [
      {
        name: process.env.RUST_EMOJI,
        value: "Report an issue with the\nRust server",
        inline: true,
      },
      {
        name: process.env.DISCORD_EMOJI,
        value: "Report an issue with the\nDiscord server",
        inline: true,
      },
      {
        name: process.env.OTHER_EMOJI,
        value: "Report a different issue",
        inline: true,
      },
    ],
  },
};
