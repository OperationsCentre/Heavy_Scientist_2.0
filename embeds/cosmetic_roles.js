const { colours } = require("../config/config.json");
const { medjay_role, spartans_role, immortals_role, centurion_role } =
  require("../config/config.json").roles;
const { rust_logo } = require("../config/config.json").images;
module.exports = {
  cosmetic_roles: {
    title: "Cosmetic Roles",
    color: colours.rust_colour,
    thumbnail: {
      url: rust_logo,
    },
    fields: [
      {
        name: ":one:",
        value: `<@&${medjay_role}>`,
        inline: true,
      },
      {
        name: ":two:",
        value: `<@&${spartans_role}>`,
        inline: true,
      },
      {
        name: ":three:",
        value: `<@&${immortals_role}>`,
        inline: true,
      },
      {
        name: ":four:",
        value: `<@&${centurion_role}>`,
        inline: true,
      },
    ],
  },
};
