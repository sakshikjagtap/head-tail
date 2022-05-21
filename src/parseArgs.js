const findFiles = (args) => {
  const regex = /^[^\d-]/;
  return args.filter((arg) => regex.test(arg));
};

const isFlag = (arg) => /^-.$/.test(arg);

const parseArgs = ([...args]) => {
  const [flag, value] = args;
  const values = { option: '-n', limit: 10 };
  if (isFlag(flag)) {
    values.option = flag;
    values.limit = +value;
  }
  values.files = findFiles(args);
  return values;
};
exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
