import axiosInstance from './axios';
import { LoginCredentials, User } from '../features/auth/types';
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
      console.log('Mock login with account:', credentials.email);
      const timestamp = new Date().getTime();
      let userData: User | null = null;

      // 1. Check hardcoded test@example.com for backward compatibility
      if (credentials.email === 'test@example.com' && credentials.password === 'test123') {
        userData = {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          gender: 'Male',
          image: 'https://robohash.org/testuser.png',
          token: 'mock-token-123',
        };
        localStorage.setItem('token', userData.token);
        localStorage.setItem('login_timestamp', timestamp.toString());
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        cachedAuthState = {
          isValid: true,
          lastChecked: timestamp,
          user: userData,
        };
        return userData;
      }

      // 2. Check mock_users in localStorage
      const usersRaw = localStorage.getItem('mock_users');
      const users: { name: string; email: string; password: string }[] = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find((u) => u.email === credentials.email && u.password === credentials.password);
      if (found) {
        userData = {
          id: Date.now(),
          username: found.name,
          email: found.email,
          firstName: found.name,
          lastName: '',
          gender: 'Other',
          image: 'https://robohash.org/' + encodeURIComponent(found.email) + '.png',
          token: 'mock-token-' + Date.now(),
        };
        localStorage.setItem('token', userData.token);
        localStorage.setItem('login_timestamp', timestamp.toString());
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        cachedAuthState = {
          isValid: true,
          lastChecked: timestamp,
          user: userData,
        };
        return userData;
      }

      // 3. If not found, throw error
      throw new Error('Incorrect email or password');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login_timestamp');
    localStorage.removeItem(USER_DATA_KEY);

    window.sessionStorage.clear();

    cachedAuthState = {
      isValid: false,
      lastChecked: 0,
      user: null,
    };

    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const now = new Date().getTime();
    if (cachedAuthState.user && cachedAuthState.isValid && now - cachedAuthState.lastChecked < CACHE_DURATION) {
      console.log('Using user information from cache:', cachedAuthState.user);
      return cachedAuthState.user;
    }

    const token = localStorage.getItem('token');
    const isValid = authService.isSessionValid();

    if (!token || !isValid) {
      console.log('Token does not exist or is invalid');

      cachedAuthState = {
        isValid: false,
        lastChecked: now,
        user: null,
      };

      return null;
    }

    try {
      const savedUserData = localStorage.getItem(USER_DATA_KEY);

      if (savedUserData) {
        try {
          const userData = JSON.parse(savedUserData) as User;
          console.log('Fetched user information from localStorage:', userData);

          cachedAuthState = {
            isValid: true,
            lastChecked: now,
            user: userData,
          };

          return userData;
        } catch (e) {
          console.error('Error parsing user data:', e);
          localStorage.removeItem(USER_DATA_KEY);
        }
      }

      console.log('No user data found, create sample data');
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        image: 'https://robohash.org/testuser.png',
        token: token,
      };

      localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

      cachedAuthState = {
        isValid: true,
        lastChecked: now,
        user: mockUser,
      };

      return mockUser;
    } catch (error) {
      console.error('Error getting current user information:', error);

      cachedAuthState = {
        isValid: false,
        lastChecked: now,
        user: null,
      };

      return null;
    }
  },

  isSessionValid: () => {
    const now = new Date().getTime();
    if (now - cachedAuthState.lastChecked < CACHE_DURATION) {
      console.log('Using session check results from cache:', cachedAuthState.isValid);
      return cachedAuthState.isValid;
    }

    const token = localStorage.getItem('token');
    const loginTimestamp = localStorage.getItem('login_timestamp');

    if (!token || !loginTimestamp) {
      console.log('Token or timestamp does not exist, invalid login session');

      cachedAuthState.isValid = false;
      cachedAuthState.lastChecked = now;

      return false;
    }

    const tokenDate = parseInt(loginTimestamp, 10);
    const isValid = now - tokenDate < TOKEN_LIFETIME;

    console.log('Checking login session:', {
      isValid,
      now: new Date(now).toLocaleString(),
      loginTime: new Date(tokenDate).toLocaleString(),
      timeElapsed: (now - tokenDate) / 1000 / 60 + ' phút',
      timeRemaining: (TOKEN_LIFETIME - (now - tokenDate)) / 1000 / 60 + ' phút',
    });

    if (!isValid) {
      console.log('Token expired. Current time:', new Date(now).toLocaleString(), 'Login time:', new Date(tokenDate).toLocaleString());
      localStorage.removeItem('token');
      localStorage.removeItem('login_timestamp');
      localStorage.removeItem(USER_DATA_KEY);
    }

    const cookieToken = authService.getTokenFromCookie();
    if (cookieToken && !validateToken(cookieToken)) {
      console.log('JWT validation failed');
      return false;
    }

    cachedAuthState.isValid = isValid;
    cachedAuthState.lastChecked = now;

    return isValid;
  },

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

  checkAndRefreshToken: async () => {
    const loginTimestamp = localStorage.getItem('login_timestamp');
    if (!loginTimestamp) return false;

    const tokenAge = new Date().getTime() - parseInt(loginTimestamp, 10);
    const timeUntilExpiry = TOKEN_LIFETIME - tokenAge;

    if (timeUntilExpiry > 0 && timeUntilExpiry < TOKEN_REFRESH_THRESHOLD) {
      console.log('Token is about to expire, refreshing...');
      return await authService.refreshToken();
    }

    return timeUntilExpiry > 0;
  },

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

      localStorage.setItem(
        'current_session',
        JSON.stringify({
          id: deviceInfo.sessionId,
          deviceInfo: deviceInfo.userAgent,
          lastActive: Date.now(),
          isCurrentDevice: true,
        })
      );

      const response = await axiosInstance.post('/auth/sessions/register', {
        deviceInfo,
        token,
      });

      return !!response.data.success;
    } catch (error) {
      console.error('Cannot register session:', error);
      return false;
    }
  },

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
      console.error('Cannot get session list:', error);
      return [];
    }
  },

  logoutSession: async (sessionId: string) => {
    try {
      const response = await axiosInstance.post('/auth/sessions/revoke', { sessionId });
      return !!response.data.success;
    } catch (error) {
      console.error('Cannot logout session:', error);
      return false;
    }
  },

  logoutAllOtherSessions: async () => {
    try {
      const currentSession = JSON.parse(localStorage.getItem('current_session') || '{}');
      if (!currentSession.id) return false;

      const response = await axiosInstance.post('/auth/sessions/revoke-all-except', {
        currentSessionId: currentSession.id,
      });

      return !!response.data.success;
    } catch (error) {
      console.error('Cannot logout other sessions:', error);
      return false;
    }
  },
};

export default authService;
