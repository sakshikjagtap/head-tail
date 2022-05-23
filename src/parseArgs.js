/* eslint-disable no-else-return */
const isFlag = (arg) => arg.startsWith('-');

const getFlag = (arg) => {
  if (arg === '-n' || arg === '-c') {
    const keys = { '-n': 'count', '-c': 'bytes' };
    return keys[arg];
  } else {
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    throw `head: illegal option -- ${arg}\n ${usage}`;
  }
};

const getValue = (nextArg) => {
  if (isFinite(+nextArg)) {
    return +nextArg;
  } else {
    throw `head: illegal line count -- ${nextArg}`;
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

const parseArgs = (args) => {
  const structuredArgs = restructureArgs(args);
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
