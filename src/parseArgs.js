const findFiles = (args) => {
  const regex = /^[^\d-]/;
  return args.filter((arg) => regex.test(arg));
};

const parseArgs = ([...args]) => {
  const values = { option: '-n', limit: 10 };
  if (/^[^-]/.test(args[0])) {
    values.files = args;
    return values;
  }
  values.option = args[0];
  values.limit = +args[1];
  values.files = findFiles(args.slice(2));
  return values;
};
exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
