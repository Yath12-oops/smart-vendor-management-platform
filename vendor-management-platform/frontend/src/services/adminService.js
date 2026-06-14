

import axios from "axios";

const API_URL = "http://localhost:8080/admin";

export const approveVendor = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/vendors/${id}/approve`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const rejectVendor = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/vendors/${id}/reject`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};