

import axios from "axios";

const API_URL = "http://localhost:8080/documents";

export const getVendorDocuments = async (vendorId) => {

const token = localStorage.getItem("token");

const response = await axios.get(
    `${API_URL}/vendor/${vendorId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

return response.data;

};

export const uploadDocument = async (
file,
documentType,
vendorId
) => {

const token = localStorage.getItem("token");

const formData = new FormData();

formData.append("file", file);
formData.append("documentType", documentType);
formData.append("vendorId", vendorId);

const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
);

return response.data;


};
