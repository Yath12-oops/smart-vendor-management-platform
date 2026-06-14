import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import Navbar from "../components/Navbar";

function Dashboard() {

    const token = localStorage.getItem("token");

    const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
});

useEffect(() => {

    const fetchStats = async () => {

        try {

            const data = await getDashboardStats();

            console.log(data);

            setStats(data);

        } catch (error) {

            console.error(error);

        }
    };

    fetchStats();

}, []);


  return ( <div> <Navbar />

    <div
        style={{
            padding: "40px",
            maxWidth: "1100px",
            margin: "0 auto"
        }}
    >
        <h1
            style={{
                textAlign: "center",
                marginBottom: "40px",
                fontSize: "56px"
            }}
        >
            Admin Dashboard
        </h1>

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "30px"
            }}
        >
            <div
                style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "20px",
                    width: "200px",
                    minHeight: "170px",
                    textAlign: "center",
                    borderRadius: "12px",
                    transition: "0.3s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
            >
                <h3>📊 Total Vendors</h3>
                <h1>{stats.totalVendors}</h1>
            </div>

            <div
                style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "20px",
                    width: "200px",
                    minHeight: "170px",
                    textAlign: "center",
                    borderRadius: "12px",
                    transition: "0.3s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
            >
                <h3>✅ Approved Vendors</h3>
                <h1>{stats.approvedVendors}</h1>
            </div>

            <div
                style={{
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "20px",
                    width: "200px",
                    minHeight: "170px",
                    textAlign: "center",
                    borderRadius: "12px",
                    transition: "0.3s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
            >
                <h3>⏳ Pending Vendors</h3>
                <h1>{stats.pendingVendors}</h1>
            </div>

            <div
                style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "20px",
                    width: "200px",
                    minHeight: "170px",
                    textAlign: "center",
                    borderRadius: "12px",
                    transition: "0.3s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
            >
                <h3>❌ Rejected Vendors</h3>
                <h1>{stats.rejectedVendors}</h1>
            </div>
        </div>
    </div>
</div>

);

}

export default Dashboard;