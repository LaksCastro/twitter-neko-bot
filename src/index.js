const Twit = require("twit");
const config = require("./config");

const client = new Twit(config);

const bot = require("./app");

bot(client);
