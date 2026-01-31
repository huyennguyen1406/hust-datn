import { axiosClient } from "./axiosClient";

export const managementUserApi = {
  getUsers: async (params) => {
    const { data } = await axiosClient.get("/dashboard/user-data/user-info", { params });
    return data;
  },

  getUserById: async (id) => {
    const { data } = await axiosClient.get(`/dashboard/user-data/user-info/${id}`);
    return data;
  },

  createOrUpdateUser: async (payload) => {
    const { data } = await axiosClient.post("/dashboard/user-data/user-info", payload);
    return data;
  },

  deleteUser: async (id) => {
    await axiosClient.delete(`/dashboard/user-data/user-info/${id}`);
  },
};
