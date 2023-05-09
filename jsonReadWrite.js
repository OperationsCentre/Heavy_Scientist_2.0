const fs = require("fs");

module.exports = {
  /**
   *
   * @param {String} fileName Name of the file you want to open from root directory
   */
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

  /**
   *
   * @param {String} fileName Name of file to write to
   * @param {JSON} file Contents to write in .json format
   */
  writeFile(fileName, file) {
    fs.writeFileSync(fileName, JSON.stringify(file));
  },
};
