const illegalOption = (option) => {
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  return { message: `head: illegal option -- ${option}\n ${usage}` };
};

const illegalLineCount = (value) => {
  return { message: `head: illegal line count -- ${value}` };
};

const combineLinesAndBytesError = () => {
  return {
    message: 'head: cant combine line and byte counts'
  };
};

exports.illegalOption = illegalOption;
exports.illegalLineCount = illegalLineCount;
exports.combineLinesAndBytesError = combineLinesAndBytesError;