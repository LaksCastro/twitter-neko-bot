const TwitterReplyFactory = require("../services");

const AutomaticTweetFactory = () => {
  const TwitterReply = TwitterReplyFactory();

  // 15 minutes
  const timeInterval = 1000 * 60 * 15;

  let loopId = null;

  const loop = () => {
    TwitterReply.send(
      (media) => ({
        status: "#StayAtHome",
        media_ids: media.media_id_string,
      }),
      () => {
        console.log("Successfully tweeted an image!");
        loopId = setTimeout(loop, timeInterval);
      }
    );
  };

  const enable = () => {
    loop();
  };

  const disable = () => {
    clearTimeout(loopId);
  };

  const public = {
    enable,
    disable,
  };

  return Object.freeze(public);
};

module.exports = AutomaticTweetFactory;
