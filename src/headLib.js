const { splitLines, joinLines } = require('./stringUtils.js');
const { data, parseArgs } = require('./parseArgs.js');
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
  } catch (error) {
    throw fileNotFound(fileName);
  }
};

const isSingleFile = headOfFiles =>
  headOfFiles.length === 1 && headOfFiles[0].status;

const print = (console, headOfFiles) => {
  if (isSingleFile(headOfFiles)) {
    console.log(headOfFiles[0].content);
    return;
  }

  let separator = '';
  headOfFiles.forEach(file => {
    if (file.status === true) {
      console.log(`${separator}==>${file.name}<==\n${file.content}`);
    } else {
      console.error(`${file.content.message}`);
    }
    separator = '\n';
  });
};

const processFile = (readFileSync, file, limit, option) => {
  try {
    const fileContent = readFile(readFileSync, file);
    return {
      name: file, content: head(fileContent, { limit, option }),
      status: true
    };
  } catch (error) {
    return { name: file, content: error, status: false };
  }
};

const headMain = (readFileSync, console, ...args) => {
  const { value: limit, flag: option, files } = parseArgs(data, args);
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
