const axios = require("axios");
const path = require("path");
const { random } = require("../utils");

const NekoBotApiFactory = () => {
  let nekoBotTypes = ["neko", "hmidriff", "coffee", "kemonomimi", "holo"];

  let getNekoBotEndpoint = (type) =>
    `https://nekobot.xyz/api/image?type=${type}`;

  const generateResult = (response) => {
    const {
      data: { message: imageUrl, img_name: imageFilename },
    } = response;

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

    const result = {
      imageUrl,
      imageFilename,
      imagePath,
      imageWebpPath,
      imageName,
    };

    return result;
  };
  const get = async () => {
    const response = await axios.get(
      getNekoBotEndpoint(nekoBotTypes[random(0, nekoBotTypes.length - 1)])
    );

    const result = generateResult(response);

    return result;
  };

  const public = {
    get,
  };

  return Object.freeze(public);
};

// Still not have implementation
const PixivApiFactory = () => {
  const get = async () => {};

  const public = {
    get,
  };

  return Object.freeze(public);
};

const availableApis = [NekoBotApiFactory];

const ImageApiFactory = () => {
  const get = async () => {
    const Factory = availableApis[random(0, availableApis.length - 1)];

    const Api = Factory();

    const result = await Api.get();

    return result;
  };

  const public = {
    get,
  };

  return Object.freeze(public);
};

module.exports = ImageApiFactory;
