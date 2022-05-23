const assert = require('assert');
const { parseArgs, getFlag, getValue, separateOptionsAndFiles, validateArgs } = require('../src/parseArgs.js');

describe('getFlag', () => {
  it('should return a flag if arg is -n1', () => {
    assert.strictEqual(getFlag('-n1'), 'count');
  });

  it('should return a flag if arg is -1', () => {
    assert.strictEqual(getFlag('-1'), 'count');
  });

  it('should return a flag if arg is -n', () => {
    assert.strictEqual(getFlag('-n'), 'count');
  });
});

describe('getValue', () => {
  it('should return a value of flag if arg is "-n 1"', () => {
    assert.strictEqual(getValue('-n', '1'), 1);
  });

  it('should return a value of flag if arg is "-n1"', () => {
    assert.strictEqual(getValue('-n1'), 1);
  });

  it('should return a value of flag if arg is "-1"', () => {
    assert.strictEqual(getValue('-1'), 1);
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

describe('separateOptionsAndFiles', () => {
  it('Should return options and values', () => {
    assert.deepStrictEqual(separateOptionsAndFiles(['-n', '1', 'a.txt']), { flags: ['-n', '1'], files: ['a.txt'] });
  });

  it('Should return options and values if arg is "-n1"', () => {
    assert.deepStrictEqual(separateOptionsAndFiles(['-n1', '-n', '1', 'a.txt']), { flags: ['-n1', '-n', '1'], files: ['a.txt'] });
  });

  it('Should return options and values if args is "-1","5"', () => {
    assert.deepStrictEqual(separateOptionsAndFiles(['-1', '5']), { flags: ['-1'], files: ['5'] });
  });
});

describe('validateArgs', () => {
  it('should give error if both flags present', () => {
    assert.throws(() => validateArgs(['-n', '3', '-c']));
  });

  it('should give error if flag is invalid', () => {
    assert.throws(() => validateArgs(['-v']));
    assert.throws(() => validateArgs(['-s']));
  });
});

