const { splitLines, joinLines } = require('./stringUtils.js');

const contentUptoCount = (lines, count) => {
  return lines.slice(0, count);
};

const head = (content, { numOfLines, numOfBytes }) => {
  const delimiter = numOfBytes ? '' : '\n';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoCount(lines, numOfLines || numOfBytes);
  return joinLines(firstLines, delimiter);
};

exports.head = head;
exports.contentUptoCount = contentUptoCount;
