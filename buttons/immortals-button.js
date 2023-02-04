const { toggleRole } = require("../libs/roles");
const { immortals_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "immortals-button" },
  async execute(interaction) {
    toggleRole(interaction, immortals_role);
  },
};
