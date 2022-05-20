const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return a line', () => {
    assert.strictEqual(head('hello', 10), 'hello');
    assert.strictEqual(head('bye', 10), 'bye');
    assert.strictEqual(head('', 10), '');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', 10),
      'a\nb\nc\nd\ne');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', 10),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('Should return only specified number of lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', 2),
      'a\nb');
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n', 11),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
  });

});
