const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should return object of argument', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', './a.txt']), {
      option: '-n', limit: 3, file: './a.txt'
    });
  });
});
