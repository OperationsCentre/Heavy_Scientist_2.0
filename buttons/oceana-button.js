const { toggleRole } = require("../libs/roles");
const { oceana_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "oceana-button" },
  async execute(interaction) {
    toggleRole(interaction, oceana_role);
  },
};
