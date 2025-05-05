// Thêm các matchers của @testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock localStorage và sessionStorage
const storageMock = () => {
  let storage = {};
  return {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => {
      storage[key] = value.toString();
    },
    removeItem: (key) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
  };
};

Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });

// Mock cho matchMedia (cần thiết cho một số thư viện UI)
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Bạn có thể thêm các mock khác tùy theo nhu cầu
global.fetch = jest.fn();
global.console = {
  ...console,
  // Ghi đè các phương thức console để không làm nhiễu output khi chạy test
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Reset mocks sau mỗi bài test
afterEach(() => {
  jest.clearAllMocks();
});
