import { axiosClient } from "./axiosClient";

export const getUserInfo = async () => {
  const { data } = await axiosClient.get("/dashboard/user-info");
  return data;
};
