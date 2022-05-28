const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { fileNotFound } = require('./errors.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, option }) => {
  const delimiter = option === 'lines' ? '\n' : '';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const readFile = (readFileSync, fileName) => {
  try {
    return readFileSync(fileName, 'utf8');
  } catch (err) {
    throw { errorCode: err.code };
  }
};

const multiFileFormatter = ({ name, content }, separator) =>
  `${separator}==>${name}<==\n${content}`;

const identity = ({ content }) => content;

const isSingleFile = (files) => files.length === 1;

const getHeader = (files) =>
  isSingleFile(files) ? identity : multiFileFormatter;

const print = ({ log, error }, headOfFiles) => {
  const header = getHeader(headOfFiles);

  let separator = '';
  headOfFiles.forEach((file) => {
    if (file.content) {
      log(header(file, separator));
    } else {
      error(`${file.error.message}`);
    }
    separator = '\n';
  });
};

const processFile = (readFileSync, file, limit, option) => {
  try {
    const allFileContent = readFile(readFileSync, file);
    return { name: file, content: head(allFileContent, { limit, option }) };
  } catch (err) {
    return { name: file, error: fileNotFound(err.errorCode, file) };
  }
};

const headMain = (readFileSync, console, ...args) => {
  const { limit, option, files } = parseArgs(args,);
  const result = files.map(file => processFile(readFileSync, file, limit,
    option));
  print(console, result);

};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
exports.readFile = readFile;
exports.processFile = processFile;
exports.print = print;
exports.identity = identity;
exports.getHeader = getHeader;
exports.multiFileFormatter = multiFileFormatter;
