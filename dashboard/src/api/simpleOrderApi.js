import { axiosClient } from "./axiosClient";

export const simpleOrderApi = {
  getUserByPhone: async (phone) => {
    const { data } = await axiosClient.get("/dashboard/user-data/user-info-by-mobile", {
      params: { mobilePhone: phone },
    });
    return data;
  },

  getProductDetails: async (productName) => {
    const { data } = await axiosClient.get("/dashboard/management-data/product-details-for-order", {
      params: { productName },
    });
    return data;
  },

  createOrder: async (payload) => {
    const { data } = await axiosClient.post("/dashboard/order/simple-order", payload);
    return data;
  },
};
