const { splitLines, joinLines } = require('./stringUtils.js');

const contentUptoCount = (lines, count) => lines.slice(0, count);

const head = (content, limit, delimiter) => {
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoCount(lines, limit);
  return joinLines(firstLines, delimiter);
};

const headMain = (readFile, fileName) => {
  const content = readFile(fileName, 'utf8');
  return head(content, 10, '\n');
};

exports.head = head;
exports.contentUptoCount = contentUptoCount;
exports.headMain = headMain;
