import { axiosClient } from "./axiosClient";

export const registerApi = async (payload) => {
  const response = await axiosClient.post("/api/v1/store/register", payload);
  return response.data;
};

export const loginApi = async (payload) => {
  const response = await axiosClient.post("/api/v1/store/login", payload);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosClient.post("/api/v1/store/logout");
  return response.data;
};
