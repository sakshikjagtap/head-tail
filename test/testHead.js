const assert = require('assert');
const { head, contentUptoLimit, headMain, readFile, processFile } = require('../src/headLib.js');
const { mockConsole } = require('./testPrint.js');

const mock = (filename, content) => {
  return (expectedFile, encoding) => {
    assert.strictEqual(filename, expectedFile);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

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

describe('readFile', () => {
  it('should read a file and return content', () => {
    const mockReadFile = mock('abc.txt', 'hello');
    assert.strictEqual(readFile(mockReadFile, 'abc.txt'), 'hello');
  });

  it('should read a file and return content', () => {
    const mockReadFile = mock('a.txt', 'hello');
    assert.throws(() => readFile(mockReadFile, 'abc.txt'));
  });
});

describe('processFile', () => {

  it('should return first 1 line of specified file', () => {
    const mockReadFile = mock('abc.txt', 'hello');
    assert.deepStrictEqual(processFile(
      mockReadFile, 'abc.txt', '1', 'count'),
      { name: 'abc.txt', content: 'hello', status: true });
  });

  it('should return error if file not found', () => {
    const mockReadFile = mock('abc.txt', 'hello');
    assert.deepStrictEqual(processFile(
      mockReadFile, 'ab.txt', '1', 'count'),
      {
        name: 'ab.txt',
        content: { message: 'head: ab.txt: No such file or directory' },
        status: false
      });
  });
});

describe('headMain', () => {
  it('should return lines of given file', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'hello');
    headMain(mockReadFileSync, mockedConsole, '-n', '1', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('should return lines of given file with specified switch', () => {
    const expContent = ['a\nb\nc'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'a\nb\nc');
    headMain(mockReadFileSync, mockedConsole, '-n', '3', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('should return lines for "-n1"', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'hello');
    headMain(mockReadFileSync, mockedConsole, '-n1', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('Throw an error when file is not present', () => {
    const mockReadFileSync = mock('a.txt', 'hello');
    const expContent = ['head: a.txt: No such file or directory\n'];
    const mockedConsole = mockConsole(expContent);
    assert.throws(() => headMain(mockReadFileSync, mockedConsole, '-n1', 'b.txt'));
    assert.strictEqual(mockedConsole.index, 0);
  });
});
