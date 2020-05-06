const Twit = require("twit");
const config = require("./config");

const Client = require("./client");
Client.set(new Twit(config));

const BotFactory = require("./bot");
const Bot = BotFactory();

Bot.initialize();
