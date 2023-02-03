const pgDatabase = require("pg");
const { username, ip, password } = require("../config/config.json").postgresql;
const pgconnection = new pgDatabase.Client({
  user: username,
  host: ip,
  database: "ticketsystem",
  password: password,
  port: 5432,
});

module.exports = {
  /**
   * Returns result of query
   * @param {string} query
   * @returns result of query
   */
  query: async function (query) {
    let response = null;
    await pgconnection.query(query, async (err, res) => {
      response = res;
    });
    return response;
  },
};
