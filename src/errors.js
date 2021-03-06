const illegalOption = (option) => {
  return { message: `head: illegal option -- ${option}\n ${usage().message}` };
};

const usage = () => {
  return { message: 'usage: head[-n lines | -c bytes][file ...]' };
};

const illegalLineCount = (value) => {
  return { message: `head: illegal line count -- ${value}` };
};

const combineLinesAndBytesError = () => {
  return {
    message: 'head: cant combine line and byte counts'
  };
};

const readFileError = (errorCode, fileName) => {
  if (errorCode === 'ENOENT') {
    return { message: `head: ${fileName}: No such file or directory` };
  } else if (errorCode === 'EISDIR') {
    return { message: `head: Error reading ${fileName}` };
  } else if (errorCode === 'EACCES') {
    return { message: `head: ${fileName}: Permission denied` };
  }
};

exports.illegalOption = illegalOption;
exports.illegalLineCount = illegalLineCount;
exports.combineLinesAndBytesError = combineLinesAndBytesError;
exports.readFileError = readFileError;
exports.usage = usage;