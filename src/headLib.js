const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, option }) => {
  const delimiter = option === 'count' ? '\n' : '';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const validateArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw 'head: cant combine line and byte counts';
  }

  if (/-[^nc\d]/.test(args)) {
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    throw 'head: illegal option -- v\n' + usage;
  }
};

const headMain = (readFile, args) => {
  validateArgs(args);
  const { limit, option, files: [file] } = parseArgs(args);
  const content = readFile(file, 'utf8');
  return head(content, { limit, option });
};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
exports.validateArgs = validateArgs;

