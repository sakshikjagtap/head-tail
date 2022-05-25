const assert = require('assert');
const { tail, lastLines, lastCharacters } = require('../src/tailLib.js');

describe('tail', () => {
  it('should return single line', () => {
    assert.strictEqual(tail('hello'), 'hello');
    assert.strictEqual(tail('bye'), 'bye');
  });

  it('should return last ten lines', () => {
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', 'lines', 10),
      'b\nc\nd\ne\nf\ng\nh\ni\nj\nk');
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm', 'lines',
      10), 'd\ne\nf\ng\nh\ni\nj\nk\nl\nm');
  });
  it('should return specified number of lines form bottom', () => {
    assert.strictEqual(tail('a\nb\nc\nd', 'lines', 2), 'c\nd');
  });
  it('should return specified number of charcters form bottom', () => {
    assert.strictEqual(tail('hello', 'bytes', 2), 'lo');
  });
});

describe('lastLines', () => {
  it('should return last specified lines of file', () => {
    assert.strictEqual(lastLines('a\nb\nc\nd\ne\nf\ng', 3), 'e\nf\ng');
    assert.strictEqual(lastLines('a\nb\nc\nd\ne\nf\ng', 0), '');
  });
});

describe('lastCharctersf', () => {
  it('should return last specified number of characters from bottom', () => {
    assert.strictEqual(lastCharacters('hello', 2), 'lo');
    assert.strictEqual(lastCharacters('hello', 0), '');
  });
});

