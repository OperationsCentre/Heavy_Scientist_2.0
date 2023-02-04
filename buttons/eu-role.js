const { toggleRole } = require("../libs/roles");
const { eu_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "eu-button" },
  async execute(interaction) {
    toggleRole(interaction, eu_role);
  },
};
