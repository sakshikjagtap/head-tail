const { splitLines, joinLines } = require('./stringUtils.js');

const contentUptoCount = (lines, count) => lines.slice(0, count);

const head = (content, limit, delimiter) => {
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoCount(lines, limit);
  return joinLines(firstLines, delimiter);
};

exports.head = head;
exports.contentUptoCount = contentUptoCount;
