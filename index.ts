var argv = require('minimist')(process.argv.slice(2));

console.log(`Running with arguments: ${argv._}`);
const daySolution = require("./solutions/0/day_0");
console.log(daySolution);
console.log(daySolution.solve("1\\n2\\2"));