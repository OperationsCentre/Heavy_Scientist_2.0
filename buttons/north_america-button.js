const { toggleRole } = require("../libs/roles");
const { north_america_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "north_america-button" },
  async execute(interaction) {
    toggleRole(interaction, north_america_role);
  },
};
