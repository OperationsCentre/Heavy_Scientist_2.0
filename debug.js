module.exports = {
  log: function (message) {
    let d = new Date();
    console.log(d.toLocaleString() + ": " + message);
  },
};
