export const LS_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const REFRESH_PATH = "/v1/auth/refresh";
export const RETRY_FLAG = "_retry";