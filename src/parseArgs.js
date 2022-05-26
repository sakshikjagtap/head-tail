const { illegalOption, illegalLineCount, combineLinesAndBytesError } = require
  ('./errors.js');

const data = [{
  flag: '-n',
  value: '10',
  standAlone: false,
  disallowedFlags: ['-c']
},
{
  flag: '-c',
  standAlone: false,
  disallowedFlags: ['-n']
}
];

const isFlag = (arg) => arg.startsWith('-');

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

const validateOption = (data, flag) => {
  const option = data.find((arg) => arg.flag === flag);
  if (!option) {
    throw illegalOption(flag.slice(1));
  }
  return option;
};

const isDisallowedFlag = (options, disallowedFlags) => {
  return disallowedFlags.some(disallowedFlag =>
    options.includes(disallowedFlag));
};

const parseArgs = (data, args) => {
  const structuredArgs = restructureArgs(args);
  const keys = { '-n': 'lines', '-c': 'bytes' };
  const parsedArgs = { flag: 'lines', value: 10 };
  const options = [];
  let index = 0;
  while (isFlag(structuredArgs[index])) {
    const option = validateOption(data, structuredArgs[index]);
    if (!option.standAlone) {
      index++;
      option.value = getValue(structuredArgs[index]);
    }

    if (isDisallowedFlag(options, option.disallowedFlags)) {
      throw combineLinesAndBytesError();
    }

    parsedArgs.flag = keys[option.flag];
    parsedArgs.value = option.value;
    options.push(option.flag, option.value);
    index++;
  }
  parsedArgs.files = structuredArgs.slice(index);
  return parsedArgs;
};

exports.data = data;
exports.parseArgs = parseArgs;
exports.getValue = getValue;
exports.restructureArgs = restructureArgs;
exports.structureArgs = structureArgs;
