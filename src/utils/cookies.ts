import Cookies from 'js-cookie';

/**
 * Cookie Management for FizaHub CRM
 * Chịu trách nhiệm LƯU TRỮ TOKEN duy nhất. 
 * KHÔNG LƯU THÔNG TIN USER Ở ĐÂY (Sẽ giao cho Zustand).
 */

export const SESSION_KEYS = {
  ACCESS_TOKEN: 'testify_access_token',
};

// ─── Access Token (Hết hạn sau 1 ngày) ───
export function getAccessToken(): string | undefined {
  return Cookies.get(SESSION_KEYS.ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
  Cookies.set(SESSION_KEYS.ACCESS_TOKEN, token, { expires: 1, path: '/' });
}

export function removeAccessToken() {
  Cookies.remove(SESSION_KEYS.ACCESS_TOKEN, { path: '/' });
}

// ─── Clear All ───
export function clearTokens() {
  removeAccessToken();
}
