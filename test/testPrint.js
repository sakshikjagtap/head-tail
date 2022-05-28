const assert = require('assert');
const { print, getHeader, singleFileFormatter, multiFileFormatter } =
  require('../src/headLib.js');

const mockConsole = function (expectedContent) {
  const callCount = { index: 0, content: [] };

  const log = function (arg) {
    assert.ok(this.index < expectedContent.length);
    assert.strictEqual(arg, expectedContent[this.index]);
    this.content.push(arg);
    this.index++;
  };

  const error = function (arg) {
    assert.ok(this.index < expectedContent.length);
    assert.strictEqual(arg, expectedContent[this.index]);
    this.content.push(arg);
    this.index++;
  };

  callCount.log = log.bind(callCount);
  callCount.error = error.bind(callCount);
  return callCount;
};

describe('print', () => {
  it('Should print single line', () => {
    const expContent = ['hello'];
    const mockedConsole = mockConsole(expContent);
    const result = [{ fileName: 'abc.txt', content: 'hello' }];
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should print two line', () => {
    const expContent = ['==>a.txt<==\nhello', '\n==>b.txt<==\nhii'];
    const result = [{ fileName: 'a.txt', content: 'hello' }
      , { fileName: 'b.txt', content: 'hii' }];
    const mockedConsole = mockConsole(expContent);
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 2);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should print if file is not exist', () => {
    const expContent = ['head: a.txt: No such file or directory'];
    const result = [
      {
        name: 'b.txt',
        error: { message: 'head: a.txt: No such file or directory' },
      }
    ];
    const mockedConsole = mockConsole(expContent);
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should print error and content when one file is existed another file is not ', () => {
    const expContent = ['==>a.txt<==\nhello',
      'head: a.txt: No such file or directory'];
    const result = [
      { fileName: 'a.txt', content: 'hello', },
      {
        fielName: 'b.txt',
        error: { message: 'head: a.txt: No such file or directory' },
      }
    ];
    const mockedConsole = mockConsole(expContent);
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 2);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });
});

describe('getHeader', () => {
  it('should return a function identity when single file is provided', () => {
    const actual = getHeader([{ name: 'a.txt', content: 'hello' }]);
    const expected = singleFileFormatter;
    assert.strictEqual(actual, expected);
  });

  it('should return multiFileFormatter when multiple files is given', () => {
    const actual = getHeader([
      { name: 'a.txt', content: 'hello' },
      { name: 'b.txt', content: 'hii' }]);
    const expected = multiFileFormatter;
    assert.strictEqual(actual, expected);
  });
});

exports.mockConsole = mockConsole;
