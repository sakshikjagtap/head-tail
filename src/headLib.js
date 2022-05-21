const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, limit, delimiter) => {
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const headMain = (readFile, args) => {
  const { limit, option, files: [file] } = parseArgs(args);
  const switches = { '-n': '\n', '-c': '' };
  const content = readFile(file, 'utf8');
  return head(content, limit, switches[option]);
};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
