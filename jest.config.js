const path = require('path');

module.exports = {
  // 测试启动文件
  setupFiles: [
    './src/test/setup.js',
  ],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // coverage information should be collected
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // The root directory that Jest should scan for tests and modules within
  rootDir: path.resolve(__dirname),

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

};
