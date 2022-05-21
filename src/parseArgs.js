const findFiles = (args) => {
  const regex = /^[^\d-]/;
  return args.filter((arg) => regex.test(arg));
};

const isFlag = (arg) => /^-.$/.test(arg);

const parseArgs = ([...args]) => {
  const values = { option: '-n', limit: 10 };
  for (let index = 0; index < args.length; index++) {
    if (isFlag(args[index])) {
      values.option = args[index];
    } else if (isFinite(args[index])) {
      values.limit = +args[index];
    }
  }
  values.files = findFiles(args);
  return values;
};
exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
