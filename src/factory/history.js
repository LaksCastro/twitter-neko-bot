const path = require("path");

const HistoryFactory = () => {
  const FileManagerFactory = require("./file");
  const FileManager = FileManagerFactory();

  const historyPath = path.normalize(
    path.join(__dirname, "..", "history.json")
  );

  // ===========================================================================================
  // Private methods to get and set the history.json file content
  // ===========================================================================================
  const getCurrent = () => JSON.parse(FileManager.read(historyPath));
  const setCurrent = (content) =>
    FileManager.write(historyPath, JSON.stringify(content));

  // ===========================================================================================
  // To get and set the history images
  // ===========================================================================================
  const getHistory = () => getCurrent().history;
  const setHistory = (getNewHistory = (history) => history) => {
    const current = getCurrent();

    const newHistory = getNewHistory(current.history);

    setCurrent({
      ...current,
      history: newHistory,
    });
  };

  // ===========================================================================================
  // To get and set the history state
  // ===========================================================================================
  const getState = (name = null) => {
    let current = getCurrent();

    const state = current.state[name] || current.state;

    return state;
  };
  const setState = (name, getNewState = (state) => state) => {
    let current = getCurrent();

    const currentState = current.state[name];

    const newState = getNewState(currentState);

    setCurrent({
      ...current,
      state: {
        ...current.state,
        [name]: newState,
      },
    });
  };

  const public = {
    getHistory,
    setHistory,
    getState,
    setState,
  };

  return Object.freeze(public);
};

module.exports = HistoryFactory;
