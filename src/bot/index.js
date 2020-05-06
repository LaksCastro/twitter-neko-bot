const AutomaticTweetFactory = require("./tweet");
const AutomaticReplyFactory = require("./quote");

const BotFactory = () => {
  const initialize = () => {
    const AutomaticTweet = AutomaticTweetFactory();
    const AutomaticReply = AutomaticReplyFactory();

    AutomaticTweet.enable();
    AutomaticReply.enable();
  };

  const public = {
    initialize,
  };

  return Object.freeze(public);
};

module.exports = BotFactory;
