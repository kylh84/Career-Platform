export const validateToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    // Check if token has correct format (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    // Try to decode the payload
    const payload = JSON.parse(atob(parts[1]));

    // Check required fields
    if (!payload.exp || !payload.iat || !payload.sub) {
      return false;
    }

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
