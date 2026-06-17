
import axios from "axios";

const API_URL = "http://localhost:8080/vendors";

export const getVendorProfile = async (userId) => {

const token = localStorage.getItem("token");

const response = await axios.get(
    `${API_URL}/user/${userId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

return response.data;

};

export const updateVendorProfile = async (vendorId, data) => {

const token = localStorage.getItem("token");

const response = await axios.put(
    `${API_URL}/${vendorId}`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

return response.data;

};
