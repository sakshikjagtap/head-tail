/* eslint-disable no-else-return */
const isFlag = (arg) => arg.startsWith('-');

const getFlag = (arg) => {
  if (arg === '-n' || arg === '-c') {
    const keys = { '-n': 'count', '-c': 'bytes' };
    return keys[arg];
  } else {
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    throw { message: `head: illegal option -- ${arg[1]}\n ${usage}` };
  }
};

const getValue = (nextArg) => {
  if (/[1-9]\d*/.test(nextArg)) {
    return +nextArg;
  } else {
    throw { message: `head: illegal line count -- ${nextArg}` };
  }
};

const structureArgs = (arg) => {
  return isFinite(+arg[1]) ? ['-n', arg[1]] : [arg.slice(0, 2), arg.slice(2)]
};

const restructureArgs = (args) => {
  const restructuredArgs = args.flatMap(arg => isFlag(arg) ?
    structureArgs(arg) : arg);
  return restructuredArgs.filter(arg => arg);
};

const areBothFlagPresent = (args) => args.includes('-n') && args.includes('-c');

const throwErrorIfBothPresent = (args) => {
  if (areBothFlagPresent(args)) {
    throw { message: 'head: cant combine line and byte counts' };
  }
};

const parseArgs = (args) => {
  const structuredArgs = restructureArgs(args);
  throwErrorIfBothPresent(structuredArgs);
  const parsedArgs = { option: 'count', limit: 10, files: [] };
  let index = 0;
  while (isFlag(structuredArgs[index])) {
    parsedArgs.option = getFlag(structuredArgs[index]);
    parsedArgs.limit = getValue(structuredArgs[index + 1]);
    index += 2;
  }
  parsedArgs.files = structuredArgs.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.getFlag = getFlag;
exports.getValue = getValue;
exports.restructureArgs = restructureArgs;
exports.areBothFlagPresent = areBothFlagPresent;
