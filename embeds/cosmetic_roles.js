const { colours } = require("../config/config.json");
const {
  harvester,
  collector,
  infantry,
  rustic_warrior,
  desert_warrior,
  warlord,
  light_side,
  dark_side,
} = require("../config/config.json").roles;
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
        value: `<@&${harvester}>`,
        inline: true,
      },
      {
        name: ":two:",
        value: `<@&${collector}>`,
        inline: true,
      },
      {
        name: ":three:",
        value: `<@&${infantry}>`,
        inline: true,
      },
      {
        name: ":four:",
        value: `<@&${rustic_warrior}>`,
        inline: true,
      },
      {
        name: ":five:",
        value: `<@&${desert_warrior}>`,
        inline: true,
      },
      {
        name: ":six:",
        value: `<@&${warlord}>`,
        inline: true,
      },
      {
        name: ":seven:",
        value: `<@&${light_side}>`,
        inline: true,
      },
      {
        name: ":eight:",
        value: `<@&${dark_side}>`,
        inline: true,
      },
    ],
  },
};
