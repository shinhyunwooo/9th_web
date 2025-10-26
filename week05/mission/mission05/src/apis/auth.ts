import axios from "axios";
import { API_BASE_URL, LS_KEYS } from "../constants/key";
import type {
  LoginRequest, LoginResponse, SignupRequest, SignupResponse, SignoutResponse
} from "../types/auth";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem(LS_KEYS.ACCESS);
  const token = raw ? (JSON.parse(raw) as string | null) : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = async (value: SignupRequest): Promise<SignupResponse> => {
  const { data } = await api.post("/v1/auth/signup", value);
  return data;
};

export const postSignin = async (value: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post("/v1/auth/signin", value);
  return data;
};

export const postSignout = async (): Promise<SignoutResponse> => {
  const { data } = await api.post("/v1/auth/signout");
  return data;
};
