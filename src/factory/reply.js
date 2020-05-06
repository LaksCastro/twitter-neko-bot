const {
  TwitterApiFactory,
  DownloadFactory,
  ImageApiFactory,
  ConverterFactory,
  FileManagerFactory,
} = require("./index");

const TwitterReplyFactory = () => {
  const ImageApi = ImageApiFactory();
  const Download = DownloadFactory();
  const Converter = ConverterFactory();
  const FileManager = FileManagerFactory();
  const TwitterApi = TwitterApiFactory();

  // ===========================================================================================
  // This function is a Wrapper for execute the following steps:
  // - Get URL of random image from ImageAPI (using ImageApi Factory)
  // - Download the image and save in local disk in /temp folder (using Download Factory)
  // - Clone the image but in webp format (using Converter Factory)
  // - Send a Twitter Reply (using using TwitterApi Factory)
  // - Delete all images on local disk, the original and webp, why they have already been sent to Twitter
  // ===========================================================================================
  // @param getStatus - Function to convert raw media data in a tweet parameters
  // @param onComplete |optional| - Function to execute when task ends
  // ===========================================================================================
  const send = async (getStatus, onComplete = () => {}) => {
    if (!getStatus)
      throw new Error("Function to get tweet status is necessary");

    try {
      const { imageUrl, imagePath, imageWebpPath } = await ImageApi.get();

      await Download.request(imageUrl, imagePath);
      await Converter.convert(imagePath, imageWebpPath, "webp");

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
