const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
  createJoinPicture: async function (member) {
    const canvas = Canvas.createCanvas(500, 250);

    const context = canvas.getContext("2d");

    const profilePicture = await Canvas.loadImage(
      member.user.displayAvatarURL()
    );

    const background = await Canvas.loadImage(
      "https://operationscentre.github.io/community/img/Rusty-Operations-Banner.png"
    );

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    /*context.drawImage(
      profilePicture,
      canvas.width / 2 - profilePicture.width / 2,
      canvas.height / 2 - profilePicture.height / 2 - 50,
      profilePicture.width,
      profilePicture.height
    );
    */

    context.lineWidth = 5;
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.textAlign = "center";
    context.fillStyle = "#F4AA1B";
    context.font = "32px Bauhaus 93";
    context.fillText(
      "WELCOME TO RUSTY OPERATIONS",
      canvas.width / 2,
      canvas.height / 2 + 90
    );
    context.font = "24px Bauhaus 93";
    context.fillText(
      member.user.username + "#" + member.user.discriminator,
      canvas.width / 2,
      canvas.height / 2 + 40
    );

    //draw picture
    context.lineWidth = 1;
    context.save();
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2 - 50,
      profilePicture.width / 2,
      0,
      Math.PI * 2,
      false
    );
    context.strokeStyle = "#F4AA1B";
    context.stroke();
    context.clip();
    context.drawImage(
      profilePicture,
      canvas.width / 2 - profilePicture.width / 2,
      canvas.height / 2 - profilePicture.height / 2 - 50,
      profilePicture.width,
      profilePicture.width
    );
    context.restore();

    // Use the helpful Attachment class structure to process the file for you
    const attachment = new AttachmentBuilder(await canvas.encode("png"));

    return attachment;
  },
};
