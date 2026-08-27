import API from "./api";

export const getVendorProfile = async (userId) => {
  const response = await API.get(`/vendors/user/${userId}`);
  return response.data;
};

export const updateVendorProfile = async (vendorId, data) => {
  const response = await API.put(`/vendors/${vendorId}`, data);
  return response.data;
};
