import API from "./api";

export const uploadDocument = async (file, documentType, vendorId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("documentType", documentType);
  formData.append("vendorId", vendorId);

  const response = await API.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getVendorDocuments = async (vendorId) => {
  const response = await API.get(`/documents/vendor/${vendorId}`);
  return response.data;
};

export const downloadDocument = async (id) => {
  const response = await API.get(`/documents/download/${id}`, {
    responseType: "blob",
  });
  return response.data;
};
