const { colours } = require("../config/config.json");
module.exports = {
  rules: {
    title: "RULES",
    description: "*Please read the rules below:*",
    color: colours.rust_colour,
    image: {
      url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
    },
    fields: [
      {
        name: ":one:",
        value: "You must be at least 16-years-old to play!",
      },
      {
        name: ":two:",
        value: "No inappropriate names, profile pictures, or status'!",
      },
      {
        name: ":three:",
        value: "Use the correct channels for what you are posting!",
      },
      {
        name: ":four:",
        value:
          "No offensive or inappropriate content, remarks, or song requests!",
      },
      {
        name: ":five:",
        value: "No NSFW content",
      },
      {
        name: ":six:",
        value: "No spamming channels!",
      },
      {
        name: ":seven:",
        value:
          "No advertising or selling of products, services or other communities!",
      },
      {
        name: ":eight:",
        value:
          "No political or religious arguments (Try to keep political and/or religious conversations to a minimum)!",
      },
      {
        name: ":nine:",
        value: "No loud noises or music played through your microphone!",
      },
      {
        name: ":one::zero:",
        value: "No abusive talk to staff! (They are here to help)!",
      },
      {
        name: ":one::one:",
        value:
          "Do not use the ticketing system for anything other than a legitimate reason!",
      },
      {
        name: ":one::two:",
        value:
          "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated.",
      },
    ],
  },
};
