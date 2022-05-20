const parseArgs = (args) => {
  return {
    option: args[0],
    limit: +args[1],
    file: args[2],
  };
};
exports.parseArgs = parseArgs;
