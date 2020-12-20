const fs = require('fs');
const paser = require('@babel/parser');

const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    console.log(content);
}

moduleAnalyser('./src/index.js');
