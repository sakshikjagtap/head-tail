const assert = require('assert');
const { head, contentUptoLimit, headMain, validateArgs } = require('../src/headLib.js');

describe('linesUptoCount', () => {
  it('Should return array of lines of specified length', () => {
    assert.deepStrictEqual(contentUptoLimit(['a', 'b', 'c', 'd'], 2), ['a', 'b']
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
    assert.strictEqual(head('a\nb\nc\nd\ne', { option: '-n', limit: 10 }),
      'a\nb\nc\nd\ne');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', {
      option: 'count',
      limit: 10
    }
    ), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('Should return only specified number of lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', { option: 'count', limit: 2 }),
      'a\nb');
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n', {
      option: 'count',
      limit: 11
    }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
  });

  it('Should return only specified number of bytes', () => {
    assert.strictEqual(head('hello', { option: 'bytes', limit: 3 }), 'hel');
    assert.strictEqual(head('bye\nhello', { option: 'bytes', limit: 5 }),
      'bye\nh');
  });

});

describe('validateArgs', () => {
  it('should give error if both flags present', () => {
    assert.throws(() => validateArgs(['-n', '3', '-c']));
  });

  it('should give error if flag is invalid', () => {
    assert.throws(() => validateArgs(['-v']));
    assert.throws(() => validateArgs(['-s']));
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
    assert.strictEqual(headMain(mockReadFileSync, ['a.txt']),
      'hello');
  });

  it('should return lines of given file with specified switch', () => {
    const mockReadFileSync = mock('a.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, ['-n', '3', 'a.txt']),
      'hello');
  });

  it('should return lines for "-n1"', () => {
    const mockReadFileSync = mock('a.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, ['-n1', 'a.txt']),
      'hello');
  });
});
