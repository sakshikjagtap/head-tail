const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

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

  it('should return object of arguments if same flag is multiple times ', () => {
    assert.deepStrictEqual(parseArgs(['-n', 2, '-n', 3, './a.txt']), {
      option: '-n', limit: 3, files: ['./a.txt']
    });
  });
});
