const { headMain } = require('./src/headLib');
const fs = require('fs');

console.log(headMain(fs.readFileSync, process.argv.slice(2)));
