const { toggleRole } = require("../libs/roles");
const { na_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "na-button" },
  async execute(interaction) {
    toggleRole(interaction, na_role);
  },
};
