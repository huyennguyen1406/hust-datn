import { axiosClient } from "./axiosClient";

export const managementApi = {
  // Brands

  getBrands: async (params) => {
    const { data } = await axiosClient.get("/dashboard/management-data/brands", { params });
    return data;
  },

  getBrandById: (id) => axiosClient.get(`/dashboard/management-data/brands/${id}`).then((res) => res.data),

  createBrand: (payload) => axiosClient.post("/dashboard/management-data/brands", payload).then((res) => res.data),

  updateBrand: (id, payload) =>
    axiosClient.patch(`/dashboard/management-data/brands/${id}`, payload).then((res) => res.data),

  deleteBrand: (id) => axiosClient.delete(`/dashboard/management-data/brands/${id}`),

  getBrandsMinimized: () => {
    return axiosClient.get("/dashboard/management-data/brands-minimized");
  },

  // Categories

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
    return axiosClient.delete(`/dashboard/management-data/categories/${id}`);
  },

  getCategoriesMinimized: () => {
    return axiosClient.get("/dashboard/management-data/categories-minimized");
  },

  // Products

  getProducts: async (params) => {
    const { data } = await axiosClient.get("/dashboard/management-data/products", { params });
    return data;
  },

  getProductsById: (id) => axiosClient.get(`/dashboard/management-data/products/${id}`).then((res) => res.data),

  createProduct: (formData) => {
    return axiosClient.post("/dashboard/management-data/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProduct: (id, formData) => {
    return axiosClient.patch(`/dashboard/management-data/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteProduct: (id) => {
    return axiosClient.delete(`/dashboard/management-data/products/${id}`);
  },

  getProductColors: () => {
    return axiosClient.get("/dashboard/management-data/products-color");
  },

  getProductDetail: (productId) => {
    return axiosClient.get(`/dashboard/management-data/products/${productId}/details`);
  },

  updateProductDetail: async (productId, payload) => {
    return axiosClient.post(`/dashboard/management-data/products/${productId}/details`, payload);
  },
};
