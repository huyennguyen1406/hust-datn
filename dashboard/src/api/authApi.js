import { axiosClient } from "./axiosClient";

export const login = async ({ email, password }) => {
  const { data } = await axiosClient.post("/dashboard/login", {
    email,
    password,
  });

  return data;
};

export const logout = async () => {
  // No body required
  await axiosClient.post("/dashboard/logout");
};
