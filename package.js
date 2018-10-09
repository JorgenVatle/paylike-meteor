Package.describe({
    name: 'jorgenvatle:paylike',
    version: '1.0.0',
    summary: 'Meteor HTTP wrapper for PayLike\'s REST API',
    git: 'https://github.com/JorgenVatle/paylike-meteor.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2');
    api.use('ecmascript');
    api.mainModule('dist/Paylike.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('meteortesting:mocha');
    api.use('jorgenvatle:paylike');
    api.mainModule('tests/paylike.test.js');
});