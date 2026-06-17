
import Navbar from "../components/Navbar";

function VendorDashboard() {

    return (

        <div>

            <Navbar />

           <div style={{ padding: "40px" }}>

<h1>Vendor Dashboard</h1>

<h3>Welcome Vendor</h3>

<p>
    Manage your profile and documents here.
</p>

<div
    style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginTop: "50px",
        flexWrap: "wrap"
    }}
>

    <button
        onClick={() => window.location.href = "/profile"}
        style={{
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "bold",
            minWidth: "220px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
        }}
    >
        👤 My Profile
    </button>

    <button
        onClick={() => window.location.href = "/documents"}
        style={{
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "bold",
            minWidth: "220px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
        }}
    >
        📄 My Documents
    </button>

</div>

</div>


        </div>

    );
}

export default VendorDashboard;