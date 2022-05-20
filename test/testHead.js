const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return a line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk'),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });
});
