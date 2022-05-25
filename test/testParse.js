const assert = require('assert');
const { parseArgs, getFlag, getValue, restructureArgs, areBothFlagPresent, throwErrorIfBothPresent, structureArgs, data } = require('../src/parseArgs.js');

describe.skip('getFlag', () => {
  it('should return a flag if arg is -n', () => {
    assert.strictEqual(getFlag('-n'), 'lines');
  });
  it('should return a flag if arg is -c', () => {
    assert.strictEqual(getFlag('-c'), 'bytes');
  });
  it('should throw an error if flag is invalid', () => {
    assert.throws(() => getFlag('-v'), {
      message: 'head: illegal option -- v\n usage: head[-n lines | -c bytes][file ...]'
    });
  });
});

describe('getValue', () => {
  it('should return a value of flag if arg is "-n 1"', () => {
    assert.strictEqual(getValue('1'), 1);
  });

  it('should throw an error if value is invalid', () => {
    assert.throws(() => getValue('b'), { message: 'head: illegal line count -- b' });
  });
  it('should throw an error if value is zero', () => {
    assert.throws(() => getValue('0'), { message: 'head: illegal line count -- 0' });
  });
});

describe('parseArgs', () => {
  it('should return object of argument', () => {
    assert.deepStrictEqual(parseArgs(data, ['-n', '3', './a.txt']), {
      flag: 'lines', value: 3, files: ['./a.txt']
    });
  });

  it('should return object of argument with default values', () => {
    assert.deepStrictEqual(parseArgs(data, ['./a.txt']), {
      flag: 'lines', value: 10, files: ['./a.txt']
    });
  });

  it('should return object of arguments if same flag is multiple times ', () => {
    assert.deepStrictEqual(parseArgs(data, ['-n', '2', '-n', '3', './a.txt']), {
      flag: 'lines', value: 3, files: ['./a.txt']
    });
  });

  it('should return object of arguments if no space between option and value', () => {
    assert.deepStrictEqual(parseArgs(data, ['-n1', './a.txt']), {
      flag: 'lines', value: 1, files: ['./a.txt']
    });
  });

  it('should return object of arguments only -1 is specify ', () => {
    assert.deepStrictEqual(parseArgs(data, ['-1', './a.txt']), {
      flag: 'lines', value: 1, files: ['./a.txt']
    });
  });

  it('should throw an error if options are invalid ', () => {
    assert.throws(() => parseArgs(data, ['-n', '1', '-c', '3', './a.txt']), { message: 'head: cant combine line and byte counts' });
    assert.throws(() => parseArgs([data, '-v', '1', './a.txt'], { message: 'head: illegal option -- v\n usage: head[-n lines | -c bytes][file ...]' }));
  });
});

describe('restrutureArgs', () => {
  it('should restructure arguments', () => {
    assert.deepStrictEqual(restructureArgs(['-n', '1', 'abc.txt']), ['-n', '1', 'abc.txt']);
    assert.deepStrictEqual(restructureArgs(['-1', 'abc.txt']), ['-n', '1', 'abc.txt']);
    assert.deepStrictEqual(restructureArgs(['-n1', 'abc.txt']), ['-n', '1', 'abc.txt']);
  });
});

describe('structureArgs', () => {
  it('Should structure argument "-n" in array', () => {
    assert.deepStrictEqual(structureArgs('-n'), ['-n', '']);
  });
  it('Should structure argument "-n1" in array', () => {
    assert.deepStrictEqual(structureArgs('-n1'), ['-n', '1']);
  });
  it('Should structure argument "-1" in array', () => {
    assert.deepStrictEqual(structureArgs('-n1'), ['-n', '1']);
  });
});

describe('areBothFlagPresent', () => {
  it('Should return true if both flags are present', () => {
    assert.strictEqual(areBothFlagPresent(['-n', '1', '-c', '1']), true);
  });
});

describe('throwErrorIfBothPresent', () => {
  it('message', () => {
    assert.throws(() => throwErrorIfBothPresent(['-n', '1', '-c', 2]), {
      message: 'head: cant combine line and byte counts'
    });
  });
});

