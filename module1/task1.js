const readLine = require('readline');
const process = require('process');

const stdin = process.stdin;
const stdout = process.stdout;

const readL = readLine.createInterface({
   input: stdin,
   output: stdout,
   terminal: false
});

const reverseString = data => data.split('').reverse().join('');

readL.on("line", inputData => {
    const reversedData = reverseString(inputData);
    console.log(reversedData);
});
