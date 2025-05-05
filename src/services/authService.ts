import axiosInstance, { loginDummyJSON } from './axios';
import { LoginCredentials, LoginResponse, User } from '../features/auth/types';
import { validateToken } from '../features/auth/utils';

const TOKEN_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const USER_DATA_KEY = 'user_data'; // Key để lưu thông tin người dùng
const TOKEN_REFRESH_THRESHOLD = 10 * 60 * 1000; // 10 phút trước khi token hết hạn

// Lưu trạng thái xác thực để tránh kiểm tra lặp lại
let cachedAuthState = {
  isValid: false,
  lastChecked: 0,
  user: null as User | null,
};

// Thời gian cache (5 giây)
const CACHE_DURATION = 5000;

interface Session {
  id: string;
  deviceInfo: string;
  lastActive: number;
  isCurrentDevice: boolean;
}

// Định nghĩa interface cho phiên từ API
interface ApiSession {
  id: string;
  deviceInfo: string;
  lastActive: number;
  [key: string]: unknown; // Cho phép các trường khác từ API
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Đang đăng nhập với tài khoản:', credentials.username);

      // Thêm timestamp để tránh cache và lỗi 304
      const timestamp = new Date().getTime();

      let userData: User | null = null;

      if (credentials.username === 'emilys') {
        // Điều chỉnh tham số để tránh lỗi 304
        const response = await loginDummyJSON(credentials.username, credentials.password, timestamp);
        if (response && response.token) {
          // Thiết lập cookie thay vì localStorage
          document.cookie = `auth_token=${response.token}; path=/; secure; samesite=strict; max-age=${TOKEN_LIFETIME / 1000}`;

          // Vẫn lưu user data trong state để sử dụng
          userData = response;
          sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

          // Cập nhật bộ nhớ cache
          cachedAuthState = {
            isValid: true,
            lastChecked: timestamp,
            user: userData,
          };
        }
        return response;
      }

      // Sử dụng axiosInstance cho các tài khoản khác, với tham số chống cache
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        username: credentials.username,
        password: credentials.password,
        _t: timestamp, // Thêm timestamp để tránh cache
      });

      // Lưu token vào localStorage nếu có
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('login_timestamp', timestamp.toString());
        // Lưu thông tin user
        userData = response.data;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        console.log('Đã lưu thông tin người dùng:', userData);

        // Cập nhật bộ nhớ cache
        cachedAuthState = {
          isValid: true,
          lastChecked: timestamp,
          user: userData,
        };
      }

      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error; // Ném lỗi để Redux slice xử lý
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login_timestamp');
    localStorage.removeItem(USER_DATA_KEY);

    // Đảm bảo đăng xuất sẽ xóa mọi thông tin người dùng
    window.sessionStorage.clear();

    // Reset cached state
    cachedAuthState = {
      isValid: false,
      lastChecked: 0,
      user: null,
    };

    // Làm mới trình duyệt để đảm bảo xóa hết cache
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    // Nếu đã có thông tin user trong cache và session vẫn hợp lệ, sử dụng lại
    const now = new Date().getTime();
    if (cachedAuthState.user && cachedAuthState.isValid && now - cachedAuthState.lastChecked < CACHE_DURATION) {
      console.log('Sử dụng thông tin người dùng từ cache:', cachedAuthState.user);
      return cachedAuthState.user;
    }

    const token = localStorage.getItem('token');
    const isValid = authService.isSessionValid();

    if (!token || !isValid) {
      console.log('Token không tồn tại hoặc không hợp lệ');

      // Cập nhật cache với trạng thái không hợp lệ
      cachedAuthState = {
        isValid: false,
        lastChecked: now,
        user: null,
      };

      return null;
    }

    try {
      // Kiểm tra xem có thông tin user trong localStorage không
      const savedUserData = localStorage.getItem(USER_DATA_KEY);

      if (savedUserData) {
        try {
          const userData = JSON.parse(savedUserData) as User;
          console.log('Đã lấy thông tin người dùng từ localStorage:', userData);

          // Cập nhật cache
          cachedAuthState = {
            isValid: true,
            lastChecked: now,
            user: userData,
          };

          return userData;
        } catch (e) {
          console.error('Lỗi khi parse dữ liệu người dùng:', e);
          localStorage.removeItem(USER_DATA_KEY);
        }
      }

      // Nếu không có dữ liệu user đã lưu, tạo thông tin mẫu
      console.log('Không tìm thấy dữ liệu user, tạo dữ liệu mẫu');
      const mockUser: User = {
        id: 1,
        username: 'emilys',
        email: 'emily@example.com',
        firstName: 'Emily',
        lastName: 'Smith',
        gender: 'female',
        image: 'https://robohash.org/hicveldicta.png',
        token: token,
      };

      // Lưu thông tin user mẫu vào localStorage để sử dụng lần sau
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

      // Cập nhật cache
      cachedAuthState = {
        isValid: true,
        lastChecked: now,
        user: mockUser,
      };

      return mockUser;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng hiện tại:', error);

      // Cập nhật cache với trạng thái lỗi
      cachedAuthState = {
        isValid: false,
        lastChecked: now,
        user: null,
      };

      return null;
    }
  },

  // Kiểm tra xem phiên đăng nhập có hiệu lực không
  isSessionValid: () => {
    // Nếu đã có kết quả trong cache, sử dụng lại
    const now = new Date().getTime();
    if (now - cachedAuthState.lastChecked < CACHE_DURATION) {
      console.log('Sử dụng kết quả kiểm tra phiên từ cache:', cachedAuthState.isValid);
      return cachedAuthState.isValid;
    }

    const token = localStorage.getItem('token');
    const loginTimestamp = localStorage.getItem('login_timestamp');

    if (!token || !loginTimestamp) {
      console.log('Token hoặc timestamp không tồn tại, phiên đăng nhập không hợp lệ');

      // Cập nhật cache
      cachedAuthState.isValid = false;
      cachedAuthState.lastChecked = now;

      return false;
    }

    // Kiểm tra thời gian sống của token
    const tokenDate = parseInt(loginTimestamp, 10);
    const isValid = now - tokenDate < TOKEN_LIFETIME;

    console.log('Kiểm tra phiên đăng nhập:', {
      isValid,
      now: new Date(now).toLocaleString(),
      loginTime: new Date(tokenDate).toLocaleString(),
      timeElapsed: (now - tokenDate) / 1000 / 60 + ' phút',
      timeRemaining: (TOKEN_LIFETIME - (now - tokenDate)) / 1000 / 60 + ' phút',
    });

    if (!isValid) {
      console.log('Token đã hết hạn. Thời gian hiện tại:', new Date(now).toLocaleString(), 'Thời gian đăng nhập:', new Date(tokenDate).toLocaleString());
      // Tự động xóa token hết hạn
      localStorage.removeItem('token');
      localStorage.removeItem('login_timestamp');
      localStorage.removeItem(USER_DATA_KEY);
    }

    // Thêm validation JWT
    const cookieToken = authService.getTokenFromCookie();
    if (cookieToken && !validateToken(cookieToken)) {
      console.log('JWT validation failed');
      return false;
    }

    // Cập nhật cache
    cachedAuthState.isValid = isValid;
    cachedAuthState.lastChecked = now;

    return isValid;
  },

  // Hàm helper để lấy token từ cookie
  getTokenFromCookie: (): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'auth_token') {
        return value;
      }
    }
    return null;
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Không có refresh token');
      }

      const response = await axiosInstance.post('/auth/refresh', { refreshToken });

      if (response.data && response.data.token) {
        document.cookie = `auth_token=${response.data.token}; path=/; secure; samesite=strict; max-age=${TOKEN_LIFETIME / 1000}`;
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('login_timestamp', new Date().getTime().toString());

        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi khi làm mới token:', error);
      return false;
    }
  },

  // Kiểm tra và tự động làm mới token nếu cần
  checkAndRefreshToken: async () => {
    const loginTimestamp = localStorage.getItem('login_timestamp');
    if (!loginTimestamp) return false;

    const tokenAge = new Date().getTime() - parseInt(loginTimestamp, 10);
    const timeUntilExpiry = TOKEN_LIFETIME - tokenAge;

    // Nếu token sắp hết hạn (còn dưới ngưỡng), làm mới nó
    if (timeUntilExpiry > 0 && timeUntilExpiry < TOKEN_REFRESH_THRESHOLD) {
      console.log('Token sắp hết hạn, đang làm mới...');
      return await authService.refreshToken();
    }

    return timeUntilExpiry > 0; // Token vẫn còn hiệu lực
  },

  // Đăng ký phiên mới khi đăng nhập
  registerSession: async () => {
    try {
      const token = authService.getTokenFromCookie();
      if (!token) return false;

      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        sessionId: Date.now().toString(36) + Math.random().toString(36).substring(2),
      };

      // Lưu thông tin phiên hiện tại
      localStorage.setItem(
        'current_session',
        JSON.stringify({
          id: deviceInfo.sessionId,
          deviceInfo: deviceInfo.userAgent,
          lastActive: Date.now(),
          isCurrentDevice: true,
        })
      );

      // Gửi thông tin phiên lên server
      const response = await axiosInstance.post('/auth/sessions/register', {
        deviceInfo,
        token,
      });

      return !!response.data.success;
    } catch (error) {
      console.error('Không thể đăng ký phiên:', error);
      return false;
    }
  },

  // Lấy danh sách phiên hoạt động
  getActiveSessions: async (): Promise<Session[]> => {
    try {
      const response = await axiosInstance.get('/auth/sessions');

      if (response.data && Array.isArray(response.data.sessions)) {
        const currentSessionId = JSON.parse(localStorage.getItem('current_session') || '{}').id;

        return response.data.sessions.map((session: ApiSession) => ({
          ...session,
          isCurrentDevice: session.id === currentSessionId,
        }));
      }

      return [];
    } catch (error) {
      console.error('Không thể lấy danh sách phiên:', error);
      return [];
    }
  },

  // Đăng xuất từ một phiên cụ thể
  logoutSession: async (sessionId: string) => {
    try {
      const response = await axiosInstance.post('/auth/sessions/revoke', { sessionId });
      return !!response.data.success;
    } catch (error) {
      console.error('Không thể đăng xuất phiên:', error);
      return false;
    }
  },

  // Đăng xuất khỏi tất cả phiên trừ phiên hiện tại
  logoutAllOtherSessions: async () => {
    try {
      const currentSession = JSON.parse(localStorage.getItem('current_session') || '{}');
      if (!currentSession.id) return false;

      const response = await axiosInstance.post('/auth/sessions/revoke-all-except', {
        currentSessionId: currentSession.id,
      });

      return !!response.data.success;
    } catch (error) {
      console.error('Không thể đăng xuất các phiên khác:', error);
      return false;
    }
  },
};

export default authService;
