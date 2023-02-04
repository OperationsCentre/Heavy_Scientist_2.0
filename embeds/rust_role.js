const { colours } = require("../config/config.json");
const { rust_logo } = require("../config/config.json").images;
module.exports = {
  rust_role: {
    title: "Rusty Operations (Rust Server)",
    thumbnail: {
      url: rust_logo,
    },
    description:
      "Make sure to get this role if you play on our Rust server so that you can see the Rust channels and get pinged for server announcements and other Rusty things.",
    color: colours.rust_colour,
  },
};
