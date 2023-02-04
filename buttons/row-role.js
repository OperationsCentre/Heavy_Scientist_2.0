const { toggleRole } = require("../libs/roles");
const { row_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "row-button" },
  async execute(interaction) {
    toggleRole(interaction, row_role);
  },
};
