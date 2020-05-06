const axios = require("axios");
const path = require("path");
const { random } = require("../utils");

// Still dont have implementation
const PixivApiFactory = () => {
  const get = async () => {};

  const public = {
    get,
  };

  return Object.freeze(public);
};

module.exports = NekoBotApiFactory;
