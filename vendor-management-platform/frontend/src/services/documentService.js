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