const fs = require('fs');
const packageJs = require('../package.js');

const jsonPath = __dirname + '/../package.json';
const packageJson = require(jsonPath);

packageJson.version = packageJs.details.version;
packageJson.private = false;

fs.writeFile(jsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log('Set package.json version to:', packageJson.version);
});