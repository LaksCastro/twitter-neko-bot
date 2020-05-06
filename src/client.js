const ClientInstanceFactory = () => {
  let client = null;

  const set = (clientInstance) => {
    if (client) throw new Error("A Client Instance Is Already Declared");

    client = clientInstance;
  };

  const get = () => client;

  const public = {
    set,
    get,
  };

  return Object.freeze(public);
};

const ClientInstance = ClientInstanceFactory();

module.exports = ClientInstance;
