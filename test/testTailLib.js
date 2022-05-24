const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe.only('tail', () => {
  it('should return single line', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });

  it('should return last ten lines', () => {
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk'), 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk');
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\m'), 'c\nd\ne\nf\ng\nh\ni\nj\nk\nl\m');
  });
});
