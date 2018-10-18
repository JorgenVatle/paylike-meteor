var Package = Package || {
    onUse: function() {},
    onTest: function() {},
    describe: function() {},
};
var module = module || {};
var details = {
    name: 'jorgenvatle:paylike',
    version: '1.1.4',
    summary: 'Meteor HTTP wrapper for PayLike\'s REST API',
    git: 'https://github.com/JorgenVatle/paylike-meteor.git',
    documentation: 'README.md'
};

Package.describe(details);

Package.onUse(function(api) {
    api.versionsFrom('1.2');
    api.use('ecmascript');
    api.addAssets('package.js', 'server');
    api.mainModule('dist/index.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('meteortesting:mocha');
    api.use('jorgenvatle:paylike');
    api.addAssets('tests/data.json', 'server');
    api.mainModule('tests/paylike.test.js', 'server');
});

module.exports = {
    details: details,
};