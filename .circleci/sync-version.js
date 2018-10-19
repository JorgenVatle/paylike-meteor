const fs = require('fs');

const jsonPath = __dirname + '/../package.json';
const jsPath = __dirname + '/../package.js';
const packageJson = require(jsonPath);

const rawJs = fs.readFileSync(jsPath, 'utf8')
    .replace(/version: '\d+\.\d+\.\d+'/, `version: '${packageJson.version}'`);

fs.writeFile(jsPath, rawJs, (err) => {
    if (err) throw err;
    console.log('Set package.js version to:', packageJson.version);
});