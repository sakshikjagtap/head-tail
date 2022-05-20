const { splitLines, joinLines } = require('../src/stringUtils');
const assert = require('assert');

describe('splitLines', () => {
  it('should split a string by newLine', () => {
    assert.deepStrictEqual(splitLines('a\nb\nc', '\n'), ['a', 'b', 'c']);
  });

  it('should split a string by ""', () => {
    assert.deepStrictEqual(splitLines('abc', ''), ['a', 'b', 'c']);
  });

  it('should split a empty string by newLine', () => {
    assert.deepStrictEqual(splitLines('', '\n'), ['']);
  });
});

describe('joinLines', () => {
  it('should join a string by newLine', () => {
    assert.deepStrictEqual(joinLines(['a', 'b', 'c'], '\n'), 'a\nb\nc');
  });

  it('should join a string by ""', () => {
    assert.deepStrictEqual(joinLines(['a', 'b', 'c'], ''), 'abc');
  });

  it('should join a empty string by newLine', () => {
    assert.deepStrictEqual(joinLines([''], '\n'), '');
  });
});
