import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  // Thêm các trường khác trong JWT
}

export const validateToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Kiểm tra thời gian hết hạn
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('Token đã hết hạn');
      return false;
    }

    // Kiểm tra thời gian tạo
    if (decoded.iat > currentTime) {
      console.warn('Token không hợp lệ: thời gian tạo trong tương lai');
      return false;
    }

    // Kiểm tra các trường bắt buộc
    if (!decoded.sub) {
      console.warn('Token không hợp lệ: thiếu trường subject');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return false;
  }
};
