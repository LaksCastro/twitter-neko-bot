const sharp = require("sharp");

const ConverterFactory = () => {
  const convert = async (oldPath, newPath) => {
    await sharp(oldPath).toFormat("webp").toFile(newPath);
  };

  const public = {
    convert,
  };

  return Object.freeze(public);
};

module.exports = ConverterFactory;
