const isFlag = (arg) => /^-./.test(arg);

const getFlag = (arg) => {
  if (/^-[a-z]\d/.test(arg)) {
    return arg.slice(0, 2);
  } else if (/^-[0-9]/.test(arg)) {
    return '-n';
  }
  return arg;
};

const getValue = (arg, nextArg) => {
  let value = arg;
  if (/^[\d]/.test(nextArg)) {
    value = +nextArg;
  } else if (/^-[a-z]\d/.test(arg)) {
    value = +arg.slice(2);
  }
  return Math.abs(value);
};

const parseArgs = (args) => {
  const parsedArgs = { option: 'count', limit: 10, files: [] };
  const options = { '-n': 'count', '-c': 'bytes' };
  for (let index = 0; index < args.length; index++) {
    if (isFlag(args[index])) {
      const flag = getFlag(args[index]);
      parsedArgs.option = options[flag];
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
