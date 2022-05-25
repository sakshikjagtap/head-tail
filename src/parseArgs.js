/* eslint-disable max-statements */
const { illegalOption, illegalLineCount, combineLinesAndBytesError } = require
  ('./errors.js');

const data = [{
  flag: '-n',
  value: '10',
  standAlone: false,
},
{
  flag: '-c',
  standAlone: false,
}
];

const isFlag = (arg) => arg.startsWith('-');

// const isValidFlag = (arg) => ['-n', '-c'].includes(arg);

// const getFlag = (arg) => {
//   if (!isValidFlag(arg)) {
//     throw illegalOption(arg[1]);
//   }
//   const keys = { '-n': 'lines', '-c': 'bytes' };
//   return keys[arg];
// };

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
  const restructuredArgs = args.flatMap(arg => isFlag(arg) ?
    structureArgs(arg) : arg);
  return restructuredArgs.filter(arg => arg);
};

const areBothFlagPresent = (args) => args.includes('-n') && args.includes('-c');

const throwErrorIfBothPresent = (args) => {
  if (areBothFlagPresent(args)) {
    throw combineLinesAndBytesError();
  }
};

const validateOption = (data, flag) => {
  const option = data.find((arg) => arg.flag === flag);
  if (!option) {
    throw illegalOption(option.flag);
  }
  return option;
};

// const parseArgs = (args) => {
//   const structuredArgs = restructureArgs(args);
//   throwErrorIfBothPresent(structuredArgs);
//   const parsedArgs = { option: 'lines', limit: 10, files: [] };
//   let index = 0;
//   while (isFlag(structuredArgs[index])) {
//     parsedArgs.option = getFlag(structuredArgs[index]);
//     parsedArgs.limit = getValue(structuredArgs[index + 1]);
//     index += 2;
//   }
//   parsedArgs.files = structuredArgs.slice(index);
//   return parsedArgs;
// };

const headValidations = ({ options, files }) => {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  throwErrorIfBothPresent(options);
  const flagsAndValues = { flag: 'lines', value: 10 };
  for (let index = 0; index < options.length; index = index + 2) {
    flagsAndValues.flag = keys[options[index]];
    flagsAndValues.value = options[index + 1];
  }
  flagsAndValues.files = files;
  return flagsAndValues;
};

const parseArgs = (data, args) => {
  const structuredArgs = restructureArgs(args);
  const options = [];
  let index = 0;
  while (isFlag(structuredArgs[index])) {
    const option = validateOption(data, structuredArgs[index]);
    if (!option.standAlone) {
      index++;
      option.value = getValue(structuredArgs[index]);
    }
    options.push(option.flag, option.value);
    index++;
  }
  const files = structuredArgs.slice(index);
  return headValidations({ options, files });
};

// exports.parser = parser;
exports.data = data;
exports.parseArgs = parseArgs;
// exports.getFlag = getFlag;
exports.getValue = getValue;
exports.restructureArgs = restructureArgs;
exports.areBothFlagPresent = areBothFlagPresent;
exports.throwErrorIfBothPresent = throwErrorIfBothPresent;
exports.structureArgs = structureArgs;
