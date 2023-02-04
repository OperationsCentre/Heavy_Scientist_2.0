const { toggleRole } = require("../libs/roles");
const { rust_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "rust-button" },
  async execute(interaction) {
    toggleRole(interaction, rust_role);
  },
};
