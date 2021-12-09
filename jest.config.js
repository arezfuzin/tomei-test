const { resolve } = require('path');

module.exports = {
    moduleNameMapper: {
        '^src/(.*)$': resolve(__dirname, './src/$1')
    },
    moduleFileExtensions: ['js', 'json'],
    moduleDirectories: ['node_modules'],
    modulePathIgnorePatterns: ['directoryNameToIgnore'],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/', 'dist/', '/src/utils'],
    coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'text-summary', 'html'],
    testEnvironment: 'node',
    verbose: true
};
