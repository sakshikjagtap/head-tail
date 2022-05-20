const assert = require('assert');
const { head, contentUptoCount, headMain } = require('../src/headLib.js');

describe('linesUptoCount', () => {
  it('Should return array of lines of specified length', () => {
    assert.deepStrictEqual(contentUptoCount(['a', 'b', 'c', 'd'], 2), ['a', 'b']
    );
  });
});

describe('head', () => {
  it('Should return a line', () => {
    assert.strictEqual(head('hello', 10, '\n'), 'hello');
    assert.strictEqual(head('bye', 10, '\n'), 'bye');
    assert.strictEqual(head('', 10, '\n'), '');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', 10, '\n'),
      'a\nb\nc\nd\ne');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', 10, '\n'
    ), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('Should return only specified number of lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', 2, '\n'),
      'a\nb');
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n', 11
      , '\n'
    ), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
  });

  it('Should return only specified number of bytes', () => {
    assert.strictEqual(head('hello', 3, ''), 'hel');
    assert.strictEqual(head('bye\nhello', 5, ''),
      'bye\nh');
  });

});

describe('headMain', () => {
  const mock = (filename, content) => {
    return (expectedFile, encoding) => {
      assert.strictEqual(filename, expectedFile);
      assert.strictEqual(encoding, 'utf8');
      return content;
    };
  };

  it('should return lines of given file', () => {
    const mockReadFileSync = mock('a.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, ['-n', '10', 'a.txt']),
      'hello');
  });
});
