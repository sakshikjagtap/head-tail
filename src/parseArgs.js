const isFlag = (arg) => arg.startsWith('-');


const getFlag = (arg) => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  return keys['-' + arg.match(/[nc]/)] || keys['-n'];
};

const getValue = (arg, nextArg) => {
  return +nextArg || +arg.match(/\d+/);
};

const validateArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw 'head: cant combine line and byte counts';
  }

  if (/-[^nc\d]/.test(args + '')) {
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    throw 'head: illegal option -- v\n' + usage;
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

const separateOptionsAndFiles = (args) => {
  let index = 0;
  const options = { flags: [] };
  while (isFlag(args[index])) {
    if (args[index].match(/-[a-z]$/)) {
      options.flags.push(args[index], args[index + 1]);
      index += 2;
    } else {
      options.flags.push(args[index]);
      index++;
    }
  }
  options.files = args.slice(index);
  return options;
};

const parseArgs = (args) => {
  const separatedargs = separateOptionsAndFiles(args);
  validateArgs(separatedargs.flags);
  const parsedArgs = { option: 'count', limit: 10, files: [] };
  for (let index = 0; index < separatedargs.flags.length; index++) {
    if (isFlag(args[index])) {
      parsedArgs.option = getFlag(args[index]);
      parsedArgs.limit = getValue(args[index], args[index + 1]);
    }
  }
  parsedArgs.files = separatedargs.files;
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.getFlag = getFlag;
exports.getValue = getValue;
exports.separateOptionsAndFiles = separateOptionsAndFiles;
exports.validateArgs = validateArgs;
exports.restructureArgs = restructureArgs;
