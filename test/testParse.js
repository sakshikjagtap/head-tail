const assert = require('assert');
const { parseArgs, getFlag, getValue, restructureArgs } = require('../src/parseArgs.js');

describe('getFlag', () => {
  it('should return a flag if arg is -n', () => {
    assert.strictEqual(getFlag('-n'), 'count');
  });
  it('should return a flag if arg is -c', () => {
    assert.strictEqual(getFlag('-c'), 'bytes');
  });
  it('should throw an error if flag is invalid', () => {
    assert.throws(() => getFlag('-v'));
  });
});

describe('getValue', () => {
  it('should return a value of flag if arg is "-n 1"', () => {
    assert.strictEqual(getValue('1'), 1);
  });

  it('should throw an error if valuse is invalid', () => {
    assert.throws(() => getValue('b'));
  });
});

describe('parseArgs', () => {
  it('should return object of argument', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', './a.txt']), {
      option: 'count', limit: 3, files: ['./a.txt']
    });
  });

  it('should return object of argument with default values', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']), {
      option: 'count', limit: 10, files: ['./a.txt']
    });
  });

  it('should return object of arguments if same flag is multiple times ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', '-n', '3', './a.txt']), {
      option: 'count', limit: 3, files: ['./a.txt']
    });
  });

  it('should return object of arguments if no space between option and value', () => {
    assert.deepStrictEqual(parseArgs(['-n1', './a.txt']), {
      option: 'count', limit: 1, files: ['./a.txt']
    });
  });

  it('should return object of arguments only -1 is specify ', () => {
    assert.deepStrictEqual(parseArgs(['-1', './a.txt']), {
      option: 'count', limit: 1, files: ['./a.txt']
    });
  });

  it('should throw an error if options are invalid ', () => {
    assert.throws(() => parseArgs(['-n', 1, '-c', 3, './a.txt']));
    assert.throws(() => parseArgs(['-v', 1, './a.txt']));
  });
});

describe('restrutureArgs', () => {
  it('should restructure arguments', () => {
    assert.deepStrictEqual(restructureArgs(['-n', '1', 'abc.txt']), ['-n', '1', 'abc.txt']);
    assert.deepStrictEqual(restructureArgs(['-1', 'abc.txt']), ['-n', '1', 'abc.txt']);
    assert.deepStrictEqual(restructureArgs(['-n1', 'abc.txt']), ['-n', '1', 'abc.txt']);
  });
});

