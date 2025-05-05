export default {
  // Môi trường test - jsdom cho phép giả lập DOM
  testEnvironment: 'jsdom',
  // Transformers - chuyển đổi TypeScript, JSX, CSS, ...
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
  },
  // Thêm testing-library matchers
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Module name mapper - xử lý các import không phải JS/TS
  moduleNameMapper: {
    // Xử lý các file CSS, SCSS, ...
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Xử lý các file tĩnh
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    // Đường dẫn tắt (nếu có)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Các file/thư mục bỏ qua khi test
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Các file cần transform
  transformIgnorePatterns: ['/node_modules/(?!@mui)'],
  // Cấu hình coverage
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/mocks/**', '!src/index.tsx'],
  // Jest sẽ tìm các file với các pattern này
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
};
