import { axiosClient } from "./axiosClient";

export const managementApi = {
  getBrands: async (params) => {
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

  getCategories: async (params) => {
    const { data } = await axiosClient.get("/dashboard/management-data/categories", { params });
    return data;
  },

  getCategoriesById: (id) => axiosClient.get(`/dashboard/management-data/categories/${id}`).then((res) => res.data),

  createCategory: (formData) => {
    return axiosClient.post("/dashboard/management-data/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateCategory: (id, formData) => {
    return axiosClient.patch(`/dashboard/management-data/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteCategory: (id) => {
    return managementApi.delete(`/dashboard/management-data/categories/${id}`);
  },
};
