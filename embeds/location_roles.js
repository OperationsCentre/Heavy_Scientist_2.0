const { colours } = require("../config/config.json");
const { na_role, eu_role, africa_role, oceana_role, south_america_role } =
  require("../config/config.json").roles;
const { rust_logo } = require("../config/config.json").images;
module.exports = {
  location_roles: {
    title: "Locations Roles",
    color: colours.rust_colour,
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
        value: `<@&${africa_role}>`,
        inline: true,
      },
      {
        name: ":four:",
        value: `<@&${oceana_role}>`,
        inline: true,
      },
      {
        name: ":five:",
        value: `<@&${south_america_role}>`,
        inline: true,
      },
    ],
  },
};
