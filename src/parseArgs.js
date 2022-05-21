const isFlag = (arg) => /^-./.test(arg);

const getFlag = (arg) => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  return keys['-' + arg.match(/[nc]/)] || keys['-n'];
};

const getValue = (arg, nextArg) => {
  return +nextArg || +arg.match(/\d/);
};

const parseArgs = (args) => {
  const parsedArgs = { option: 'count', limit: 10, files: [] };
  for (let index = 0; index < args.length; index++) {
    if (isFlag(args[index])) {
      parsedArgs.option = getFlag(args[index]);
      parsedArgs.limit = getValue(args[index], args[index + 1]);
    } else if (!isFinite(args[index])) {
      parsedArgs['files'].push(args[index]);
    }
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.getFlag = getFlag;
exports.getValue = getValue;
