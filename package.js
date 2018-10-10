var packageJson = require('./package.json');

Package.describe({
    name: 'jorgenvatle:paylike',
    version: packageJson.version,
    summary: packageJson.description,
    git: packageJson.repository.url.replace('git+', ''),
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2');
    api.use('ecmascript');
    api.mainModule('dist/Paylike/index.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('meteortesting:mocha');
    api.use('jorgenvatle:paylike');
    api.addAssets('tests/data.json', 'server');
    api.mainModule('tests/paylike.test.js');
});