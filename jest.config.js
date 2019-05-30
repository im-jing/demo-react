const path = require('path');

module.exports = {
  // 测试启动文件
  setupFiles: [
    '<rootDir>/test/setup.js',
  ],

  // The root directory that Jest should scan for tests and modules within
  rootDir: path.resolve(__dirname),

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

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // 根据文件后缀，mock掉图片模块、样式模块等不需要处理的模块
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    // '^@/(.*)': '<rootDir>/src/$1',
  },

  snapshotSerializers: ['enzyme-to-json/serializer'],

};
