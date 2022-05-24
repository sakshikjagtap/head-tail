const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('should return single line', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });
});
