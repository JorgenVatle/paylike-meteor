const fs = require('fs');
const jsonPath = '../package.json';
const packageJson = require(jsonPath);
const packageJs = require('../package.js');

packageJson.version = packageJs.details.version;
packageJson.private = false;

fs.writeFile(jsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log('Set package.json version to:', packageJson.version);
});