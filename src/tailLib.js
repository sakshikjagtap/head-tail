const { splitLines, joinLines } = require('../src/stringUtils.js');

const lastLines = (content, value) => {
  const lines = splitLines(content, '\n');
  const startValue = lines.length - value;
  const bottomLines = lines.slice(startValue);
  return joinLines(bottomLines, '\n');
};

const lastCharacters = (content, value) => {
  const startValue = content.length - value;
  return content.slice(startValue);
};

const tail = (content, flag, value) => {
  if (flag === 'lines') {
    return lastLines(content, value);
  }
  return lastCharacters(content, value);
};

const tailMain = (readFile, flag, value, fileName) => {
  const parsedArgs = { '-n': 'lines', '-c': 'bytes' };
  const content = readFile(fileName, 'utf8');
  return tail(content, parsedArgs[flag], +value);
};

exports.tailMain = tailMain;
exports.tail = tail;
exports.lastLines = lastLines;
exports.lastCharacters = lastCharacters;
