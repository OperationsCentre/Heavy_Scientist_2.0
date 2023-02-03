const { colours } = require("../config/config.json");
module.exports = {
  rust_server: {
    title: "Rusty Operations",
    description:
      "Our server brings a premium experience, offering a mixture of rebalanced gameplay, premium plugins and new maps. For US and UK/EU players!",
    color: colours.rust_colour,
    image: {
      url: "https://media.discordapp.net/attachments/742826117395775589/918252341587742730/RusticOperationsThemedHD.png",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Rusty Operations 3x | Solo/Duo/Trio | (½Decay|RaidAlarm|Loot+|Shop)\n  •   Server IP: www.rustyoperations.com:28025",
      },
      {
        name: "Wipe Info:",
        value:
          "Our server does a __map and blueprint__ wipe __ every other Thursday (biweekly)__ so as to stay on schedule with the Rust monthly updates.",
      },
      {
        name: "Features:",
        value:
          "  •   3x Gather, 2x Sulfur, 3x Comps, Less Junk\n  •   Decay ½, All Transport Entities Decay Reduced (TC NEEDED)\n  •   Resources 3x, Components 2x, Charcoal 3x Stacksize\n  •   Wood 4x, Stone 4x, Metal 4x TC Stacksize\n  •   Medsyringe & Medkit 3, Bandage 5\n  •   2x Recycling Speed\n  •   55 Min Day, 5 Min Night\n  •   2x Smelting Speed\n  •   10min Hackable Crate",
      },
      {
        name: "Addon Events:",
        value:
          "  •   Raidable bases, with easy, medium, hard levels of difficulty can purchase expert and nightmare.\n  •   PilotEject for patrol heli, scientist eject upon shooting it down.\n  •   PlaneCrash, shoot plane down with lock on rocket/velocity rocket or has a 15% chance to malfunction.\n  •   HijackableCH47, can take control of chinook to fly.\n  •   Power Grid, to tap into and steal power from the power lines, has great detail as you can be electricuted, also adds street lights.",
      },
      {
        name: "VIP Plugins:",
        value:
          "SkinBox, SignArtist, AutoCode, AutoDoor, EnhancedHammer, NameChanger, ColouredChat and QueueSkip.\nUse, /INFO - for patreon details click 'view webpage' at bottom",
      },
      {
        name: "Admins:",
        value:
          "Our admins are there to help with __important issues__ on the server and are __as active as they can be__, please respect this. __Do not call admins for silly issues__ and respect that they __may be busy__, so please __do not demand things or complain__ if they cannot be there right away.",
      },
      {
        name: "Vote For Our Server:",
        value:
          "Every 24-hours you can vote for our server here to claim rewards in-game. Click [here](https://rust-servers.net/server/166243/). You can also use `/rust vote` to have the link sent to your DMs.",
      },
      {
        name: "Shortcut:",
        value:
          "You can get a join link to the server by typing `/rust` into any chat. <@813799178689708104> will DM you the link!",
      },
    ],
  },
};
