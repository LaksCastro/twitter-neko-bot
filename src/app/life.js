const replyTo = require("../services");

// 1000 miliseconds = 1 second
// * 60 = 60 seconds = 1 minute
// * 15 = 15 minutes
// Time interval: 15 minutes
const timeInterval = 1000 * 60 * 15;

const WaifuBotLife = () => {
  replyTo(
    (media) => ({
      status: "#StayAtHome",
      media_ids: media.media_id_string,
    }),
    () => {
      setTimeout(WaifuBotLife, timeInterval);
    }
  );
};

// Init Function: Called Only Once
const init = () => {
  // Init Waifu Life
  WaifuBotLife();
};

module.exports = init;
