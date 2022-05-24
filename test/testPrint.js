const assert = require('assert');
const { print } = require('../src/headLib.js');

const mockConsole = function (expectedContent) {
  const callCount = { index: 0, content: [] };
  const log = function (arg) {
    assert.ok(this.index < expectedContent.length);
    assert.deepStrictEqual(arg, expectedContent[this.index]);
    callCount.content.push(arg);
    this.index++;
  };

  const error = function (arg) {
    assert.ok(this.index < expectedContent.length);
    assert.strictEqual(arg, expectedContent[this.index]);
    callCount.content.push(arg);
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
    const result = [{ name: 'abc.txt', content: 'hello', status: true }];
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 1);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should print two line', () => {
    const expContent = ['==>a.txt<==\nhello\n', '==>b.txt<==\nhii\n'];
    const result = [{ name: 'a.txt', content: 'hello', status: true },
    { name: 'b.txt', content: 'hii', status: true }];
    const mockedConsole = mockConsole(expContent);
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 2);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });

  it('Should one file is existd another file is not existed ', () => {
    const expContent = ['==>a.txt<==\nhello\n',
      'head: a.txt: No such file or directory\n'];
    const result = [{ name: 'a.txt', content: 'hello', status: true },
    {
      name: 'b.txt',
      content: { message: 'head: a.txt: No such file or directory' },
      status: false
    }];
    const mockedConsole = mockConsole(expContent);
    print(mockedConsole, result);
    assert.strictEqual(mockedConsole.index, 2);
    assert.deepStrictEqual(mockedConsole.content, expContent);
  });
});

exports.mockConsole = mockConsole;