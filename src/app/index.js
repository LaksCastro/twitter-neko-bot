const { setClient } = require("../client");

const life = require("./life");
const quote = require("./quote");

const init = (client) => {
  setClient(client);

  life();
  quote();
};

module.exports = init;
