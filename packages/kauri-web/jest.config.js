// jest.config.js
module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    // ... other setup files ...
  ],
  // ... other options ...
}