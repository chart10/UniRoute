module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
};
