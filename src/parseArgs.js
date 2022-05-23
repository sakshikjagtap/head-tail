const isFlag = (arg) => arg.startsWith('-');

const isValidFlag = (arg) => ['-n', '-c'].includes(arg);

const illegalOption = (option) => {
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  return { message: `head: illegal option -- ${option}\n ${usage}` };
};

const getFlag = (arg) => {
  if (!isValidFlag(arg)) {
    throw illegalOption(arg[1]);
  }
  const keys = { '-n': 'count', '-c': 'bytes' };
  return keys[arg];
};

const isValidValue = (value) => isFinite(+value) && +value > 0;

const illegalLineCount = (value) => {
  return { message: `head: illegal line count -- ${value}` };
};

const getValue = (value) => {
  if (!isValidValue(value)) {
    throw illegalLineCount(value);
  }
  return +value;
};

const structureArgs = (arg) => {
  return isFinite(+arg[1]) ? ['-n', arg[1]] : [arg.slice(0, 2), arg.slice(2)];
};

const restructureArgs = (args) => {
  const restructuredArgs = args.flatMap(arg => isFlag(arg) ?
    structureArgs(arg) : arg);
  return restructuredArgs.filter(arg => arg);
};

const areBothFlagPresent = (args) => args.includes('-n') && args.includes('-c');

const combineLinesAndBytesError = () => {
  return {
    message: 'head: cant combine line and byte counts'
  };
};

const throwErrorIfBothPresent = (args) => {
  if (areBothFlagPresent(args)) {
    throw combineLinesAndBytesError();
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
exports.throwErrorIfBothPresent = throwErrorIfBothPresent;
