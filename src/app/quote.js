let client = null;
const replyTo = require("../services");

// All Quotes Reply Feature Listener is here
const WaifuBotQuoteFeature = (tweet) => {
  const { user, id_str } = tweet;

  replyTo(
    (media) => ({
      status: `@${user.name} #StayAtHome`,
      media_ids: media.media_id_string,
      in_reply_to_status_id: id_str,
    }),
    () => console.log("Respondi o usuário " + user.name)
  );
};

const init = () => {
  client = require("../client").getClient();

  const stream = client.stream("statuses/filter", {
    track: ["@WaifuAwesomeBot"],
  });

  stream.on("tweet", WaifuBotQuoteFeature);
};

module.exports = init;
