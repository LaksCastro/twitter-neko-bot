const fs = require("fs");

const FileManagerFactory = () => {
  const del = (path) => fs.unlinkSync(path);

  const create = (path) => fs.createWriteStream(path);

  const getBase64 = (path) => fs.readFileSync(path, { encoding: "base64" });

  const public = {
    del,
    create,
    getBase64,
  };

  return Object.freeze(public);
};

module.exports = FileManagerFactory;
