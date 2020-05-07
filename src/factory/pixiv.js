const path = require("path");

const PixivApiFactory = () => {
  const { random } = require("../utils");

  const DownloadFactory = require("./download");
  const HistoryFactory = require("./history");
  const Download = DownloadFactory();
  const History = HistoryFactory();

  const client = require("../client/pixiv").get();

  const api_name = "pixiv_api";

  const generateResult = async (response) => {
    const index = random(0, response.illusts.length - 1);

    const image = response.illusts[index];

    const { id: imageId, imageUrls: imageSizes } = image;

    const history = History.getHistory();

    // To prevent to send duplicated images
    if (history.some((img) => img.imageId === imageId))
      return await generateResult(response);

    const { large: imageUrl } = imageSizes;

    const parts = imageUrl.split("/");

    const imageFilename = parts[parts.length - 1];

    const imageName = imageFilename
      .split(".")
      .filter((_, i, all) => i < all.length - 1)
      .join(".");

    const imagePath = path.normalize(
      path.join(__dirname, "..", "temp", imageFilename)
    );

    const imageWebpPath = path.normalize(
      path.join(__dirname, "..", "temp", imageName + ".webp")
    );

    await Download.request(imageUrl, imagePath, {
      responseEncoding: null,
      headers: {
        Referer: "http://www.pixiv.net/",
      },
    });

    const result = {
      imageUrl,
      imageFilename,
      imagePath,
      imageWebpPath,
      imageName,
      imageId,
      imageAuthor: response.author,
      source: api_name,
    };

    return result;
  };

  const get = async () => {
    const {
      user: { id },
    } = client.authInfo();

    const { userPreviews: followers } = await client.userFollowing(id);

    const followerToGetIllust = followers[random(0, followers.length - 1)];

    const { id, name } = followerToGetIllust.user;

    const response = await client.userIllusts(id);

    return { ...response, author: name };
  };

  const public = {
    get,
    generateResult,
    api_name,
  };

  return Object.freeze(public);
};

module.exports = PixivApiFactory;
