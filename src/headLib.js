const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const contentUptoCount = (lines, count) => lines.slice(0, count);

const head = (content, limit, delimiter) => {
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoCount(lines, limit);
  return joinLines(firstLines, delimiter);
};

const headMain = (readFile, [...args]) => {
  const { limit, file, option } = parseArgs(args);
  const switches = { '-n': '\n', '-c': '' };
  const content = readFile(file, 'utf8');
  return head(content, limit, switches[option]);
};

exports.head = head;
exports.contentUptoCount = contentUptoCount;
exports.headMain = headMain;
