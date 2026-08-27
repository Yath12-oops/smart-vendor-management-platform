import API from "./api";

export const approveVendor = async (id) => {
  const response = await API.put(`/admin/vendors/${id}/approve`);
  return response.data;
};

export const rejectVendor = async (id) => {
  const response = await API.put(`/admin/vendors/${id}/reject`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await API.get("/admin/documents");
  return response.data;
};

export const verifyDocument = async (id) => {
  const response = await API.put(`/admin/documents/${id}/verify`);
  return response.data;
};

export const rejectDocument = async (id) => {
  const response = await API.put(`/admin/documents/${id}/reject`);
  return response.data;
};
