module.exports = {
  // Configuración para el mapeo de módulos (si es necesario)
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
  },

  // Configuración del tiempo de espera global
  testTimeout: 10000,  // 10 segundos por prueba

  // Configuración del archivo de setup para Jest
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },

};