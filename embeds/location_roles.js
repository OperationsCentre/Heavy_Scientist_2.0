const { colours } = require("../config/config.json");
const {
  north_america_role,
  europe_role,
  asia_role,
  africa_role,
  oceana_role,
  south_america_role,
} = require("../config/config.json").roles;
const { rust_logo } = require("../config/config.json").images;
module.exports = {
  location_roles: {
    title: "Locations Roles",
    color: colours.rust_colour,
    fields: [
      {
        name: ":one:",
        value: `<@&${north_america_role}>`,
        inline: true,
      },
      {
        name: ":two:",
        value: `<@&${europe_role}>`,
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
      {
        name: ":six:",
        value: `<@&${asia_role}>`,
        inline: true,
      },
    ],
  },
};
