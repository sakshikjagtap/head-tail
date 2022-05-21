const assert = require('assert');
const { parseArgs, findFiles } = require('../src/parseArgs.js');

describe('findFiles', () => {
  it('should find a single file', () => {
    assert.deepStrictEqual(findFiles(['-n', '3', 'a.txt']), ['a.txt']);
  });

  it('should find multiple file', () => {
    assert.deepStrictEqual(findFiles(['-n', '3', 'a.txt', 'b.txt']), ['a.txt'
      , 'b.txt']);
  });
});

describe('parseArgs', () => {
  it('should return object of argument', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', './a.txt']), {
      option: '-n', limit: 3, files: ['./a.txt']
    });
  });

  it('should return object of argument with default values', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']), {
      option: '-n', limit: 10, files: ['./a.txt']
    });
  });
});
