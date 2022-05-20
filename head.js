const { headMain } = require('./src/headLib');
const fs = require('fs');

console.log('usage: head [-n lines | -c bytes] [file ...]');
console.log(headMain(fs.readFileSync, process.argv[2]));
