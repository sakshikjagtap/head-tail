/* eslint-disable max-statements */
const { illegalOption, illegalLineCount, combineLinesAndBytesError, usage } =
  require('./errors.js');

const isFlag = (arg) => arg?.startsWith('-');

const isValidFlag = (arg) => ['-n', '-c'].includes(arg);

const getFlag = (arg) => {
  if (!isValidFlag(arg)) {
    throw illegalOption(arg[1]);
  }
  const keys = { '-n': 'lines', '-c': 'bytes' };
  return keys[arg];
};

const isValidValue = (value) => isFinite(+value) && +value > 0;

const getValue = (value) => {
  if (!isValidValue(value)) {
    throw illegalLineCount(value);
  }
  return +value;
};

const structureArgs = (arg) => {
  return isFinite(arg.slice(1)) ? ['-n', arg.slice(1)] : [arg.slice(0, 2)
    , arg.slice(2)];
};

const restructureArgs = (args) => {
  return args.flatMap(arg => isFlag(arg) ?
    structureArgs(arg) : arg).filter(arg => arg);
};

const areBothFlagPresent = (args) => args.includes('-n') && args.includes('-c');

const validateCombinedFlag = (args) => {
  if (areBothFlagPresent(args)) {
    throw combineLinesAndBytesError();
  }
};

const validateFiles = (files) => {
  if (files.length === 0) {
    throw usage();
  }
};

const parseArgs = (args) => {
  const structuredArgs = restructureArgs(args);
  const parsedArgs = { option: 'lines', limit: 10 };
  let index = 0;
  while (isFlag(structuredArgs[index])) {
    parsedArgs.option = getFlag(structuredArgs[index]);
    parsedArgs.limit = getValue(structuredArgs[index + 1]);
    index += 2;
  }
  parsedArgs.files = structuredArgs.slice(index);
  validateCombinedFlag(structuredArgs);
  validateFiles(parsedArgs.files);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.getValue = getValue;
exports.getFlag = getFlag;
exports.restructureArgs = restructureArgs;
exports.areBothFlagPresent = areBothFlagPresent;
exports.validateCombinedFlag = validateCombinedFlag;
exports.structureArgs = structureArgs;
