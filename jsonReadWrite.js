const fs = require("fs");

module.exports = {
  readFile: function (fileName) {
    fs.readFile(fileName, "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return null;
      }
      try {
        const file = JSON.parse(jsonString);
        return file;
      } catch (err) {
        console.log("Error parsing JSON string:", err);
        return null;
      }
    });
  },

  writeFile(fileName, file) {
    fs.writeFileSync(fileName, JSON.stringify(file));
  },
};
