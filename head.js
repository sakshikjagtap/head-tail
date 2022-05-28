const { headMain } = require('./src/headLib');
const fs = require('fs');

const main = function () {
  const logger = { log: console.log, error: console.error };
  const args = process.argv.slice(2);

  try {
    process.exitCode = headMain(fs.readFileSync, logger, ...args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();
