const { toggleRole } = require("../libs/roles");
const { africa_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "africa-button" },
  async execute(interaction) {
    toggleRole(interaction, africa_role);
  },
};
