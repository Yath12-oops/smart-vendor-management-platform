import axios from "axios";

const API = "http://localhost:8080/admin/documents";

export const getAllDocuments = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(API, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    return response.data;
};

export const verifyDocument = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(

        `http://localhost:8080/admin/documents/${id}/verify`,

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );
};

export const rejectDocument = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(

        `http://localhost:8080/admin/documents/${id}/reject`,

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );
};

export const getVendorDocuments = async (vendorId) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `http://localhost:8080/documents/vendor/${vendorId}`,

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

        "http://localhost:8080/documents/upload",

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

export const viewDocument = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `http://localhost:8080/documents/download/${id}`,

        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    const url = window.URL.createObjectURL(response.data);

    window.open(url, "_blank");

};