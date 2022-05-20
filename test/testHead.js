const assert = require('assert');
const { head, contentUptoCount } = require('../src/headLib.js');

describe('linesUptoCount', () => {
  it('Should return array of lines of specified length', () => {
    assert.deepStrictEqual(contentUptoCount(['a', 'b', 'c', 'd'], 2), ['a', 'b']
    );
  });
});

describe('head', () => {
  it('Should return a line', () => {
    assert.strictEqual(head('hello', { numOfLines: 10 }), 'hello');
    assert.strictEqual(head('bye', { numOfLines: 10 }), 'bye');
    assert.strictEqual(head('', { numOfLines: 10 }), '');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', { numOfLines: 10 }),
      'a\nb\nc\nd\ne');
  });

  it('Should return 10 lines when content is more than 10 lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', {
      numOfLines: 10
    }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('Should return only specified number of lines', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne', { numOfLines: 2 }),
      'a\nb');
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\n', {
      numOfLines:
        11
    }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
  });

  it('Should return only specified number of bytes', () => {
    assert.strictEqual(head('hello', { numOfBytes: 3 }), 'hel');
    assert.strictEqual(head('bye\nhello', { numOfBytes: 5 }), 'bye\nh');
  });

});
