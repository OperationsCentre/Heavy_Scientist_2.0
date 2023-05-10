const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isButton()) {
      const button = interaction.client.buttons.get(interaction.customId);

      if (!button) {
        console.error(`No button matching ${interaction.customId} was found.`);
        return;
      }

      try {
        await button.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.customId}`);
        console.error(error);
      }
    } else if (interaction.isModalSubmit()) {
      const modal = interaction.client.modals.get(interaction.customId);

      if (!modal) {
        console.error(`No modal matching ${interaction.customId} was found.`);
        return;
      }

      try {
        await modal.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.customId}`);
        console.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const select_menu = interaction.client.select_menu.get(
        interaction.customId
      );

      if (!select_menu) {
        console.error(`No modal matching ${interaction.customId} was found.`);
        return;
      }

      try {
        await select_menu.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.customId}`);
        console.error(error);
      }
    }
  },
};
