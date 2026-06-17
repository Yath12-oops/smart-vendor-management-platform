
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
getVendorProfile,
updateVendorProfile
} from "../services/profileService";

function Profile() {

const userId = localStorage.getItem("userId");

const [vendor, setVendor] = useState({
    id: "",
    companyName: "",
    gstNumber: "",
    panNumber: "",
    status: ""
});

useEffect(() => {

    fetchProfile();

}, []);

const fetchProfile = async () => {

    try {

        const data = await getVendorProfile(userId);

        setVendor(data);

        localStorage.setItem("vendorId", data.id);

    } catch (error) {

        console.error(error);

    }
};

const handleUpdate = async (e) => {

    e.preventDefault();

    try {

        await updateVendorProfile(
            vendor.id,
            {
                companyName: vendor.companyName,
                gstNumber: vendor.gstNumber,
                panNumber: vendor.panNumber
            }
        );

        alert("Profile Updated Successfully");

    } catch (error) {

        console.error(error);

    }
};

return (

    <div>

        <Navbar />

        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "30px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                borderRadius: "12px"
            }}
        >

            <h2>Vendor Profile</h2>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    placeholder="Company Name"
                    value={vendor.companyName}
                    onChange={(e) =>
                        setVendor({
                            ...vendor,
                            companyName: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="text"
                    placeholder="GST Number"
                    value={vendor.gstNumber}
                    onChange={(e) =>
                        setVendor({
                            ...vendor,
                            gstNumber: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="text"
                    placeholder="PAN Number"
                    value={vendor.panNumber}
                    onChange={(e) =>
                        setVendor({
                            ...vendor,
                            panNumber: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "12px 20px",
                        backgroundColor: "#22c55e",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Update Profile
                </button>

            </form>

        </div>

    </div>
);

}

export default Profile;
