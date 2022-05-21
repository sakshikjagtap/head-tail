const isFlag = (arg) => /^-.$/.test(arg);

const parseArgs = ([...args]) => {
  const options = { option: '-n', limit: 10 };
  let index = 0;
  while (isFlag(args[index])) {
    options.option = args[index];
    options.limit = +args[index + 1];
    index += 2;
  }
  options.files = args.slice(index);
  return options;
};

exports.parseArgs = parseArgs;
