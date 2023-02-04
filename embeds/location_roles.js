const { colours } = require("../config/config.json");
const { na_role, eu_role, row_role } = require("../config/config.json").roles;
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
        value: `<@&${na_role}>`,
        inline: true,
      },
      {
        name: ":two:",
        value: `<@&${eu_role}>`,
        inline: true,
      },
      {
        name: ":three:",
        value: `<@&${row_role}>`,
        inline: true,
      },
    ],
  },
};
