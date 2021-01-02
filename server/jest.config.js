module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@user/(.*)$': '<rootDir>/user/$1',
    '@chat/(.*)$': '<rootDir>/chat/$1',
    '@post/(.*)$': '<rootDir>/post/$1',
    '@auth/(.*)$': '<rootDir>/auth/$1',
    '@types': '<rootDir>/types/types',
    '@enums': '<rootDir>/types/enums',
    '@secrets': '<rootDir>/config/secrets',
    '@constants': '<rootDir>/config/constants',
    '@providers': '<rootDir>/config/providers',
  },
};
