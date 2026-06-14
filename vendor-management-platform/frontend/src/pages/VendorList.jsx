import { useEffect, useState } from "react";
import { getAllVendors } from "../services/vendorService";
import Navbar from "../components/Navbar";
import {approveVendor, rejectVendor} from "../services/adminService";

function VendorList() {

    const [vendors, setVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchVendors = async () => {

    try {

        const data = await getAllVendors();

        setVendors(data);

    } catch (error) {

        console.error(error);

    }
};
useEffect(() => {

    fetchVendors();

}, []);

    const handleApprove = async (id) => {

    try {

        await approveVendor(id);

        await fetchVendors();

        alert("Vendor Approved");

    } catch (error) {

        console.error(error);

    }
};

const handleReject = async (id) => {

    try {

        await rejectVendor(id);

        await fetchVendors();

        alert("Vendor Rejected");

    } catch (error) {

        console.error(error);

    }
};

const filteredVendors = vendors.filter((vendor) =>
    vendor.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
);

    return (
    <div style={{ padding: "20px" }}>

        <Navbar/>
        
        <h1>Vendor Management</h1>

<div
    style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "25px"
    }}
>
        <input
    type="text"
    placeholder="Search by company name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
    width: "400px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "#1e293b",
    color: "white",
    fontSize: "16px",
    outline: "none"
}}
/>
</div>

       <table
         style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
            }}
        >

            <thead>
                <tr>
                    <th style={{
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px"
}}>
               Company Name
                </th>

            <th style={{
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px"
}}>
                GST Number
            </th>

            <th style={{
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px"
}}>
            PAN Number
            </th>

            <th style={{
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px"
}}>
                Status
                </th>

                <th style={{
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px"
}}>
                Actions
                </th>       
                </tr>
            </thead>

            <tbody>

               {filteredVendors.map((vendor, index) => (

                    <tr key={index}>

    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {vendor.companyName}
    </td>

    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {vendor.gstNumber}
    </td>

    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {vendor.panNumber}
    </td>

    <td style={{ border: "1px solid #ddd", padding: "10px" }}>

        <span
            style={{
                padding: "6px 12px",
                borderRadius: "20px",
                color: "white",
                backgroundColor:
                    vendor.status === "APPROVED"
                        ? "green"
                        : vendor.status === "PENDING"
                        ? "orange"
                        : "red"
            }}
        >
            {vendor.status}
        </span>

    </td>

    <td style={{ border: "1px solid #ddd", padding: "10px" }}>

       <button
    onClick={() => handleApprove(vendor.id)}
    style={{
        backgroundColor: "#22c55e",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        marginRight: "8px"
    }}
>
    Approve
</button>

        {" "}

       <button
    onClick={() => handleReject(vendor.id)}
    style={{
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
    }}
>
    Reject
</button>

    </td>

</tr>
                ))}

            </tbody>

        </table>

    </div>
);
}

export default VendorList;