const TwitterReplyFactory = require("../services");
const { get } = require("../client");

const AutomaticReplyFactory = () => {
  const TwitterReply = TwitterReplyFactory();

  let client = null;

  const onUserQuoteBot = (tweet) => {
    const { user, id_str } = tweet;

    TwitterReply.send(
      (media) => ({
        status: `@${user.name} #StayAtHome`,
        media_ids: media.media_id_string,
        in_reply_to_status_id: id_str,
      }),
      () => console.log("Successfully reply to user: " + user.name)
    );
  };

  const enable = () => {
    client = get();

    const stream = client.stream("statuses/filter", {
      track: ["@WaifuAwesomeBot"],
    });

    stream.on("tweet", onUserQuoteBot);
  };

  const public = {
    enable,
  };

  return Object.freeze(public);
};

module.exports = AutomaticReplyFactory;
