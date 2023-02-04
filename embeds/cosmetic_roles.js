const { colours } = require("../config/config.json");
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
        value: "<@&786593800596357130>",
        inline: true,
      },
      {
        name: ":two:",
        value: "<@&1047156960769867916>",
        inline: true,
      },
      {
        name: ":three:",
        value: "<@&917405625712001085>",
        inline: true,
      },
      {
        name: ":four:",
        value: "<@&786591672770625548>",
        inline: true,
      },
    ],
  },
};
