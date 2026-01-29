import { axiosClient } from "./axiosClient";

export const managementApi = {
  getBrands: async (params) => {
    console.log(params);
    const { data } = await axiosClient.get("/dashboard/management-data/brands", { params });
    return data;
  },

  // ===== GET BY ID (edit page) =====
  getBrandById: (id) => axiosClient.get(`/dashboard/management-data/brands/${id}`).then((res) => res.data),

  // ===== CREATE =====
  createBrand: (payload) => axiosClient.post("/dashboard/management-data/brands", payload).then((res) => res.data),

  // ===== UPDATE =====
  updateBrand: (id, payload) =>
    axiosClient.patch(`/dashboard/management-data/brands/${id}`, payload).then((res) => res.data),

  // ===== DELETE =====
  deleteBrand: (id) => axiosClient.delete(`/dashboard/management-data/brands/${id}`),
};
