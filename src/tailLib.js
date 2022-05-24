const lastLines = (content, value) => {
  const lines = content.split('\n');
  const lastTenLines = lines.slice(-value);
  return lastTenLines.join('\n');
};

const lastCharacters = (content, value) =>
  content.slice(-value);

const tail = (content, flag, value) => {
  if (flag === 'lines') {
    return lastLines(content, value);
  }
  return lastCharacters(content, value);
};

exports.tail = tail;