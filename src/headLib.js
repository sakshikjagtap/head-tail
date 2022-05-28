const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { readFileError } = require('./errors.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, option }) => {
  const delimiter = option === 'lines' ? '\n' : '';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const readFile = (readFileSync, fileName) => {
  try {
    return { content: readFileSync(fileName, 'utf8') };
  } catch ({ code }) {
    return { code };
  }
};

const multiFileFormatter = ({ fileName, content }, separator) =>
  `${separator}==>${fileName}<==\n${content}`;

const singleFileFormatter = ({ content }) => content;

const isSingleFile = (files) => files.length === 1;

const getHeader = (files) =>
  isSingleFile(files) ? singleFileFormatter : multiFileFormatter;

const print = ({ log, error }, headOfFiles) => {
  const header = getHeader(headOfFiles);

  let separator = '';
  headOfFiles.forEach((file) => {
    if (file.content) {
      log(header(file, separator));
    } else {
      error(file.error.message);
    }
    separator = '\n';
  });
};

const headFile = (readFileSync, fileName, limit, option) => {
  const fileContent = readFile(readFileSync, fileName);

  if (fileContent.code) {
    const error = readFileError(fileContent.code, fileName);
    return { fileName, error };
  }
  const content = head(fileContent.content, { limit, option });
  return { fileName, content };
};

const getExitCode = (fileReports) =>
  fileReports.filter((report) => report.error).length;

const headMain = (readFileSync, console, ...args) => {
  const { limit, option, files } = parseArgs(args);
  const fileReports = files.map(file => headFile(readFileSync, file, limit,
    option));
  print(console, fileReports);
  return getExitCode(fileReports);
};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
exports.readFile = readFile;
exports.headFile = headFile;
exports.print = print;
exports.singleFileFormatter = singleFileFormatter;
exports.getHeader = getHeader;
exports.multiFileFormatter = multiFileFormatter;
exports.getExitCode = getExitCode;
