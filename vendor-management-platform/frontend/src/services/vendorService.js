import API from "./api";

export const getAllVendors = async () => {
  const response = await API.get("/vendors");
  return response.data;
};

export const getVendorById = async (id) => {
  const response = await API.get(`/vendors/${id}`);
  return response.data;
};

export const getVendorByUserId = async (userId) => {
  const response = await API.get(`/vendors/user/${userId}`);
  return response.data;
};

export const updateVendor = async (id, data) => {
  const response = await API.put(`/vendors/${id}`, data);
  return response.data;
};

export const deleteVendor = async (id) => {
  const response = await API.delete(`/vendors/${id}`);
  return response.data;
};
