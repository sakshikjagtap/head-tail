const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, option }) => {
  const delimiter = option === 'count' ? '\n' : '';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const headMain = (readFile, ...args) => {
  const { limit, option, files: [file] } = parseArgs(args);
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (error) {
    throw `head: ${file}: No such file or directory`;
  }
  return head(content, { limit, option });
};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
