import { Link } from "react-router-dom";

function Navbar() {
    
const role = localStorage.getItem("role");

return (

    <nav
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 30px",
            backgroundColor: "#1e293b",
            color: "white"
        }}
    >

        <h2>Smart Vendor Management</h2>

        <div>

            {role === "ADMIN" && (
                <>
                    <Link
                        to="/dashboard"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/vendors"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Vendors
                    </Link>
                </>
            )}

            {role === "VENDOR" && (
                <>
                    <Link
                        to="/vendor-dashboard"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Vendor Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        My Profile
                    </Link>

                    <Link
                        to="/documents"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        My Documents
                    </Link>
                </>
            )}

            <button
                onClick={() => {

                    localStorage.removeItem("token");
                    localStorage.removeItem("role");

                    window.location.href = "/";
                }}
                style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "none"
                }}
            >
                Logout
            </button>

        </div>

    </nav>
);


}

export default Navbar;
