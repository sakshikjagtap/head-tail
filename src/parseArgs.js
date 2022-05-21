const isFlag = (arg) => /^-.$/.test(arg);

const parseArgs = (args) => {
  const parsedArgs = { option: 'count', limit: 10 };
  const options = { '-n': 'count', '-c': 'bytes' };
  let index = 0;
  while (isFlag(args[index])) {
    parsedArgs.option = options[args[index]];
    parsedArgs.limit = +args[index + 1];
    index += 2;
  }
  parsedArgs.files = args.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
