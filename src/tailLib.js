const tail = (content) => {
  const lines = content.split('\n');
  const lastTenLines = lines.slice(-10);
  return lastTenLines.join('\n');
};

exports.tail = tail;