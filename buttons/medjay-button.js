const { toggleRole } = require("../libs/roles");
const { medjay_role } = require("../config/config.json").roles;
module.exports = {
  data: { name: "medjay-button" },
  async execute(interaction) {
    toggleRole(interaction, medjay_role);
  },
};
