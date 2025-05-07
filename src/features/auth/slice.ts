import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, User } from './types';
import authService from '../../services/authService';

// Check for initial auth state from localStorage
const savedUser = authService.getCurrentUser();
const isSessionValid = authService.isSessionValid();

// Lưu giá trị ban đầu khi khởi tạo
const initialState: AuthState = {
  user: savedUser,
  isAuthenticated: !!savedUser && isSessionValid,
  isLoading: false,
  error: null,
};

console.log('Initial auth state:', initialState);

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    console.log('Login response from API:', response);
    return response;
  } catch (error: unknown) {
    // Handle API errors
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response?: { status: number; data?: { message?: string } } }).response;
      if (response) {
        const status = response.status;
        const message = response.data?.message || 'Login failed';

        if (status === 400) {
          return rejectWithValue(`Invalid login information: ${message}`);
        } else if (status === 401) {
          return rejectWithValue('Incorrect email or password');
        } else if (status === 429) {
          return rejectWithValue('Too many requests. Please try again later');
        } else {
          return rejectWithValue(`Server error (${status}): ${message}`);
        }
      }
    }

    // For other types of errors
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Unable to connect to the server. Please check your network and try again');
  }
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, { rejectWithValue }) => {
  try {
    const user = authService.getCurrentUser();
    if (!user) {
      return rejectWithValue('User information not found');
    }
    console.log('Refreshed user data:', user);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unable to update user information');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    // Thêm action đồng bộ để cập nhật trạng thái xác thực
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;

        // Đảm bảo có dữ liệu hợp lệ từ response
        if (action.payload && action.payload.token) {
          state.isAuthenticated = true;
          state.user = action.payload;
        } else {
          // Nếu không có token trong response, đăng nhập thất bại
          state.isAuthenticated = false;
          console.error('Login response missing token:', action.payload);
        }

        state.error = null;
        console.log('Auth state updated after login success:', {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          hasToken: !!state.user?.token,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = (action.payload as string) || 'Login failed. Please try again.';
        console.log('Auth state updated after login failure:', { isAuthenticated: false, error: state.error });
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        // Kiểm tra xem user có hợp lệ không
        if (action.payload && action.payload.token) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          // Nếu user không hợp lệ, giữ nguyên trạng thái hiện tại
          console.error('Refresh user response invalid:', action.payload);
        }
        console.log('User refresh result:', { isAuthenticated: state.isAuthenticated, hasUser: !!state.user });
      })
      .addCase(refreshUser.rejected, (state) => {
        // Khi không thể refresh user data, đặt isAuthenticated thành false để tránh vòng lặp vô hạn
        state.isAuthenticated = false;
        state.user = null;
        console.log('Failed to refresh user data, authentication reset');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        console.log('Auth state cleared after logout');
      });
  },
});

export const { resetAuthState, setAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
