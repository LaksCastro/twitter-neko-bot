const sharp = require("sharp");

const ConverterFactory = () => {
  // ===========================================================================================
  // To convert a existing file to a new file with the new format
  // ===========================================================================================
  // @param oldPath: Path that current file exists
  // @param newPath: Path output of the new file with the new format
  // @param newFormat: The new format of the old file
  // ===========================================================================================
  const convert = async (oldPath, newPath, newFormat) => {
    await sharp(oldPath).toFormat(newFormat).toFile(newPath);
  };

  const public = {
    convert,
  };

  return Object.freeze(public);
};

module.exports = ConverterFactory;
