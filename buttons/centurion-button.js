const { toggleRole } = require("../libs/roles");
const { centurion_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "centurion-button" },
  async execute(interaction) {
    toggleRole(interaction, centurion_role);
  },
};
