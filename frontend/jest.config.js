module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1' // For path aliases if using them
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet)/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};