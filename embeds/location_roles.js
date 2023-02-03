const { colours } = require("../config/config.json");
module.exports = {
  location_roles: {
    title: "Locations Roles",
    color: process.env.EMBED_COLOUR,
    thumbnail: {
      url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
    },
    fields: [
      {
        name: ":one:",
        value: "<@&1047157742831423549>",
        inline: true,
      },
      {
        name: ":two:",
        value: "<@&1047157818999963648>",
        inline: true,
      },
      {
        name: ":three:",
        value: "<@&1047158446602063913>",
        inline: true,
      },
    ],
  },
};
