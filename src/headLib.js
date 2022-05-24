const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const contentUptoLimit = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, option }) => {
  const delimiter = option === 'count' ? '\n' : '';
  const lines = splitLines(content, delimiter);
  const firstLines = contentUptoLimit(lines, limit);
  return joinLines(firstLines, delimiter);
};

const readFile = (readFileSync, fileName) => {
  try {
    return readFileSync(fileName, 'utf8');
  } catch (error) {
    throw { message: `head: ${fileName}: No such file or directory` };
  }
};

const print = (console, resultOfFiles) => {
  if (resultOfFiles.length === 1) {
    console.log(resultOfFiles[0].content);
  }

  for (let index = 0; index < resultOfFiles.length; index++) {
    const file = resultOfFiles[index];
    if (resultOfFiles[index].status === true) {
      console.log('\n==>', file.name, '<==\n', file.content);
    }
    console.error(file.content);
  }
};

const processFile = (readFileSync, file, limit, option) => {
  try {
    const fileContent = readFile(readFileSync, file);
    return {
      name: file, content: head(fileContent, { limit, option }),
      status: true
    };
  } catch (error) {
    return { name: file, content: error, stauts: false };
  }
};

const headMain = (readFileSync, console, ...args) => {
  const { limit, option, files } = parseArgs(args);
  const result = files.map(file => processFile(readFileSync, file, limit,
    option));
  print(console, result);
};

exports.head = head;
exports.contentUptoLimit = contentUptoLimit;
exports.headMain = headMain;
exports.readFile = readFile;
