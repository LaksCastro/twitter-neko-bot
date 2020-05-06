const path = require("path");
const { readdirSync } = require("fs");

let allFactories = {};

// ===========================================================================================
// Centralize All Factory Functions in a single file
// ===========================================================================================
readdirSync(path.join(__dirname))
  .filter((fileName) => fileName !== "index.js")
  .forEach((fileName) => {
    const fullPath = path.join(__dirname, fileName);

    const Factory = require(fullPath);

    allFactories = {
      ...allFactories,
      [Factory.name]: Factory,
    };
  });

module.exports = allFactories;
