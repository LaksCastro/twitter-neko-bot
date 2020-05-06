let client = null;

const setClient = (clientInstance) => {
  client = clientInstance;
};

const getClient = () => client;

exports.setClient = setClient;
exports.getClient = getClient;
