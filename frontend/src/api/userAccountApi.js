import { axiosClient } from "./axiosClient";

export const getAccountInfoApi = async () => {
  const response = await axiosClient.get("/api/v1/store/account/info");
  return response.data;
};

export const postAccountInfoApi = async ({ firstName, lastName, avatar }) => {
  const formData = new FormData();

  formData.append("firstName", firstName);
  formData.append("lastName", lastName);

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await axiosClient.post("/api/v1/store/account/info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getProvinces = async () => {
  const res = await axiosClient.get("/api/v1/store/account/provinces");
  return res.data;
};

export const getDistrictsByProvince = async (provinceId) => {
  const res = await axiosClient.get(`/api/v1/store/account/provinces/${provinceId}/districts`);
  return res.data;
};

export const getDeliveryInfo = async () => {
  const res = await axiosClient.get("/api/v1/store/account/deliver-info");
  return res.data;
};

export const upsertDeliveryInfo = async (payload) => {
  console.log("upsertDeliveryInfo payload:", payload);
  const res = await axiosClient.post("/api/v1/store/account/deliver-info", payload);
  return res.data;
};
