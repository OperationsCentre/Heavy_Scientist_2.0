const { toggleRole } = require("../libs/roles");
const { spartans_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "spartans-button" },
  async execute(interaction) {
    toggleRole(interaction, spartans_role);
  },
};
