const assert = require('assert');
const { head, contentUptoLimit, headMain, readFile, headFile, getExitCode } =
  require('../src/headLib.js');
const { mockConsole } = require('./testPrint.js');

const mock = (filename, content, err) => {
  return (expectedFile, encoding) => {
    if (filename !== expectedFile) {
      throw err;
    }
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
  it('Should return a line when single line is present', () => {
    assert.strictEqual(head('hello', 10, '\n'), 'hello');
    assert.strictEqual(head('bye', 10, '\n'), 'bye');
  });

  it('Should not return content in case of empty line', () => {
    assert.strictEqual(head('', 10, '\n'), '');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', {
      option: 'lines',
      limit: 10
    }
    ), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('Should return only specified number of lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', { option: 'lines', limit: 2 }),
      'a\nb');
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n',
      {
        option: 'lines',
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
    const mockReadFile = mock('abc.txt', 'hello', { code: 'ENOENT' });
    assert.deepStrictEqual(readFile(mockReadFile, 'abc.txt'),
      { content: 'hello' });
  });

  it('should throw an "ENONT" error code when file is not present', () => {
    const mockReadFile = mock('a.txt', 'hello', { code: 'ENOENT' });
    const expected = { code: 'ENOENT' };
    assert.deepStrictEqual(readFile(mockReadFile, 'abc.txt'), expected);
  });

  it('should throw an "EISDIR" error when file is not present', () => {
    const mockReadFile = mock('a.txt', 'hello', { code: 'EISDIR' });
    const expected = { code: 'EISDIR' };
    assert.deepStrictEqual(readFile(mockReadFile, 'abc.txt'), expected);
  });

  it('should throw an "EACCES" error when file is not present', () => {
    const mockReadFile = mock('a.txt', 'hello', { code: 'EACCES' });
    const expected = { code: 'EACCES' };
    assert.deepStrictEqual(readFile(mockReadFile, 'abc.txt'), expected);
  });
});

describe('headFile', () => {
  it('should return first 1 line of specified file', () => {
    const mockReadFile = mock('abc.txt', 'hello');
    assert.deepStrictEqual(headFile(mockReadFile, 'abc.txt', '1', 'lines'),
      { fileName: 'abc.txt', content: 'hello' });
  });

  it('should return error if file not found', () => {
    const mockReadFile = mock('abc.txt', 'hello', { code: 'ENOENT' });
    assert.deepStrictEqual(headFile(mockReadFile, 'ab.txt', '1', 'lines'),
      {
        fileName: 'ab.txt',
        error: { message: 'head: ab.txt: No such file or directory' }
      });
  });

  it('should return error if permission denied', () => {
    const mockReadFile = mock('abc.txt', 'hello', { code: 'EACCES' });
    assert.deepStrictEqual(headFile(mockReadFile, 'ab.txt', '1', 'lines'),
      {
        fileName: 'ab.txt',
        error: { message: 'head: ab.txt: Permission denied' }
      });
  });

  it('should return error if directory is present', () => {
    const mockReadFile = mock('abc.txt', 'hello', { code: 'EISDIR' });
    assert.deepStrictEqual(headFile(mockReadFile, './ab', '1', 'lines'),
      {
        fileName: './ab',
        error: { message: 'head: Error reading ./ab' }
      });
  });
});

describe('headMain', () => {
  it('should return lines of given file', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'hello', { code: 'ENOENT' });
    headMain(mockReadFileSync, mockedConsole, '-n', '1', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('should return lines of given file with specified switch', () => {
    const expContent = ['a\nb\nc'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'a\nb\nc', { code: 'ENOENT' });
    headMain(mockReadFileSync, mockedConsole, '-n', '3', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('should return lines for "-n1"', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    const mockReadFileSync = mock('a.txt', 'hello', { code: 'ENOENT' });
    headMain(mockReadFileSync, mockedConsole, '-n1', 'a.txt');
    assert.strictEqual(mockedConsole.index, 1);
  });

  it('Throw an error when file is not present', () => {
    const mockReadFileSync = mock('a.txt', 'hello', { code: 'ENOENT' });
    const expContent = ['head: a.txt: No such file or directory\n'];
    const mockedConsole = mockConsole(expContent);
    assert.throws(
      () => headMain(mockReadFileSync, mockedConsole, '-n1', 'b.txt'));
    assert.strictEqual(mockedConsole.index, 0);
  });
});

describe('getExitCode', () => {
  it('should return exit code 0 when all files are present', () => {
    const reports = [{ fileName: 'a.txt', content: 'hello' }];
    assert.strictEqual(getExitCode(reports), 0);
  });

  it('should return exit code 0 when all files are present', () => {
    const reports = [{ fileName: 'a.txt', error: 'hello' }];
    assert.strictEqual(getExitCode(reports), 1);
  });
});
