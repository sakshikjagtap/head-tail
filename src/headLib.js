const splitByNewLine = content => content.split('\n');

const joinByNewLine = (lines) => lines.join('\n');

const head = (content) => {
  const lines = splitByNewLine(content);
  const firstLines = lines.slice(0, 10);
  return joinByNewLine(firstLines);
};

exports.head = head;
