const FileManagerFactory = require("../file");
const ConverterFactory = require("./converter");
const ImageApiFactory = require("./image");
const DownloadFactory = require("./download");
const TwitterApiFactory = require("./twitter");

const TwitterReplyFactory = () => {
  const ImageApi = ImageApiFactory();
  const Download = DownloadFactory();
  const Converter = ConverterFactory();
  const FileManager = FileManagerFactory();
  const TwitterApi = TwitterApiFactory();

  const send = async (getStatus, onComplete = () => {}) => {
    if (!getStatus)
      throw new Error("Function to get tweet status is necessary");

    try {
      const { imageUrl, imagePath, imageWebpPath } = await ImageApi.get();

      await Download.request(imageUrl, imagePath);
      await Converter.convert(imagePath, imageWebpPath);

      const imageData = FileManager.getBase64(imageWebpPath);

      TwitterApi.requestReply(imageData, getStatus, onComplete);

      FileManager.del(imagePath);
      FileManager.del(imageWebpPath);
    } catch (error) {
      const date = new Date();

      const datelog = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };

      console.log(datelog);

      console.log(error);
    } finally {
      onComplete();
    }
  };

  const public = {
    send,
  };

  return Object.freeze(public);
};

module.exports = TwitterReplyFactory;
