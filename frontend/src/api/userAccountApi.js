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
