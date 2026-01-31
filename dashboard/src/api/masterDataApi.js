import { axiosClient } from "./axiosClient";

export const downloadProvinceTemplateApi = async () => {
  return axiosClient.get("/dashboard/master-data/province-template", {
    responseType: "blob",
  });
};

export const importProvincesApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosClient.post("/dashboard/master-data/provinces/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getProvincesApi = async (params = {}) => {
  const { data } = await axiosClient.get("/dashboard/master-data/provinces", {
    params,
  });
  return data;
};

/* =========================
   District
   ========================= */

export const downloadDistrictTemplateApi = async () => {
  return axiosClient.get("/dashboard/master-data/district-template", {
    responseType: "blob",
  });
};

export const importDistrictsApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosClient.post("/dashboard/master-data/districts/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getDistrictsApi = async (params = {}) => {
  const { data } = await axiosClient.get("/dashboard/master-data/districts", {
    params,
  });
  return data;
};
