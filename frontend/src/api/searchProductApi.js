import { axiosClient } from "./axiosClient";

// Get all brands
export const getStoreBrands = async () => {
  const res = await axiosClient.get("/api/v1/store/products/brands");
  return res.data;
};

// Get all categories
export const getStoreCategories = async () => {
  const res = await axiosClient.get("/api/v1/store/products/categories");
  return res.data;
};

// Get all colors
export const getStoreColors = async () => {
  const res = await axiosClient.get("/api/v1/store/products/colors");
  return res.data;
};

// Get banners by category
export const getStoreBanners = async (categoryKeyword) => {
  const res = await axiosClient.get("/api/v1/store/products/banners", {
    params: { categoryKeyword },
  });
  return res.data;
};

// Search products
export const searchStoreProducts = async (params) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );

  const { data } = await axiosClient.get("/api/v1/store/products/search", { params: cleanedParams });
  return data;
};
