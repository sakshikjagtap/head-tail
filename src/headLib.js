const { splitLines, joinLines } = require('./stringUtils.js');

const linesUptoCount = (lines, count) => {
  return lines.slice(0, count);
};

const head = (content, count) => {
  const lines = splitLines(content);
  const firstLines = linesUptoCount(lines, count);
  return joinLines(firstLines);
};

exports.head = head;
exports.linesUptoCount = linesUptoCount;
