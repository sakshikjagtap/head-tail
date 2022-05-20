const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const firstTenLines = lines => lines.slice(0, 10);

const head = (content) => {
  const lines = splitLines(content);
  const firstLines = firstTenLines(lines);
  return joinLines(firstLines);
};

exports.head = head;
