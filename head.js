const { headMain } = require('./src/headLib');
const fs = require('fs');

// console.log('usage: head [-n lines | -c bytes] [file ...]');
const main = function () {
  try {
    console.log(headMain(fs.readFileSync, { log: console.log, error: console.error }, ...process.argv.slice(2)));
  } catch (error) {
    console.error(error);
  }
};

main();
