module.exports = {
  // Especifica los patrones de búsqueda para los archivos de prueba
  testMatch: [
    "<rootDir>/src/**/*.{test.js, test.jsx, test.ts, test.tsx}",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
  ],

  // Configuración para el mapeo de módulos (si es necesario)
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
  },

  // Configuración del tiempo de espera global
  testTimeout: 10000,  // 10 segundos por prueba

  // Configuración del archivo de setup para Jest
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Configuración del entorno de pruebas
  testEnvironment: "jsdom",

  // Transforma archivos JavaScript con Babel
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Agregar extensión .js en los módulos
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Evita que Jest ignore la transformación de axios en node_modules
  transformIgnorePatterns: [
    "/node_modules/(?!axios|other-modules-to-transform)"
  ],

  // Configuración para la recopilación de cobertura
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts", // Si tienes archivos de definición
  ],

  // Cobertura de las páginas (si es necesario incluirlas)
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/pages/",  // Si deseas excluir las páginas, comenta esta línea si quieres incluirlas
  ]
};
