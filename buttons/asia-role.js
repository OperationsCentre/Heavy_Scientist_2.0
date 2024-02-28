const { toggleRole } = require("../libs/roles");
const { asia_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "row-button" },
  async execute(interaction) {
    toggleRole(interaction, asia_role);
  },
};
