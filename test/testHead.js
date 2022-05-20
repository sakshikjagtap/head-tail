const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return a line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
});
