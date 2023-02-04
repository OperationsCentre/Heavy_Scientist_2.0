const { colours } = require("../config/config.json");
const { rust_logo } = require("../config/config.json").images;
module.exports = {
  location_roles: {
    title: "Locations Roles",
    color: colours.rust_colour,
    thumbnail: {
      url: rust_logo,
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
