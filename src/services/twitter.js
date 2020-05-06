const { get } = require("../client");

const TwitterApiFactory = () => {
  const requestReply = (imageData, getStatus, onComplete = () => {}) => {
    let client = get();

    client.post("media/upload", { media: imageData }, function (error, media) {
      if (error) {
        console.log(error);
      } else {
        const status = getStatus(media);

        client.post("statuses/update", status, function (error) {
          if (error) return console.log(error);

          onComplete();
        });
      }
    });
  };

  const public = {
    requestReply,
  };

  return Object.freeze(public);
};

module.exports = TwitterApiFactory;
