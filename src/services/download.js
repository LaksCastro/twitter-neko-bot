const axios = require("axios");
const FileManagerFactory = require("../file");

const DownloadFactory = () => {
  const FileManager = FileManagerFactory();

  const request = async (url, outputPath, onComplete = () => {}) => {
    const response = await axios({
      url,
      responseType: "stream",
    });

    return await new Promise((resolve, reject) => {
      response.data
        .pipe(FileManager.create(outputPath))
        .on("finish", () => resolve())
        .on("error", (e) => reject(e));
    });
  };

  const public = {
    request,
  };

  return Object.freeze(public);
};

module.exports = DownloadFactory;
