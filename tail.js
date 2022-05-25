const fs = require('fs');
const { tailMain } = require('./src/tailLib.js');

// console.log('usage: tail [-c # | -n #] [file ...]');

const main = () => {
  console.log(tailMain(fs.readFileSync, ...process.argv.slice(2)));
};

main();
