
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();

    try {
const response = await login(email, password);
        
localStorage.setItem("token", response.token);

localStorage.setItem("role", response.role);

localStorage.setItem("userId", response.userId);

if (response.role === "ADMIN") {

    navigate("/dashboard");

} else {

    navigate("/vendor-dashboard");

}
       
    } catch (error) {
        console.error(error);

        alert("Login Failed!");
    }
};

  return (
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
backgroundColor: "#0f172a"
}}
>
<div
style={{
backgroundColor: "#1e293b",
padding: "40px",
borderRadius: "15px",
width: "400px",
boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
textAlign: "center"
}}
>
<h2
style={{
color: "white",
marginBottom: "10px"
}}
>
Smart Vendor Management </h2>

{/* 
        <p
            style={{
                color: "#cbd5e1",
                marginBottom: "30px"
            }}
        >
            Welcome Back Admin
        </p> */}

        <form onSubmit={handleLogin}>
            <div
                style={{
                    textAlign: "left",
                    marginBottom: "20px"
                }}
            >
                <label
                    style={{
                        color: "white",
                        display: "block",
                        marginBottom: "8px"
                    }}
                >
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #475569",
                        backgroundColor: "#334155",
                        color: "white",
                        boxSizing: "border-box"
                    }}
                />
            </div>

            <div
                style={{
                    textAlign: "left",
                    marginBottom: "25px"
                }}
            >
                <label
                    style={{
                        color: "white",
                        display: "block",
                        marginBottom: "8px"
                    }}
                >
                    Password
                </label>

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #475569",
                        backgroundColor: "#334155",
                        color: "white",
                        boxSizing: "border-box"
                    }}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}
            >
                Login
            </button>

            <p
    style={{
        color: "white",
        marginTop: "15px",
        textAlign: "center"
    }}
>
    Don't have an account?

    <Link
        to="/register"
        style={{
            color: "#60a5fa",
            marginLeft: "5px"
        }}
    >
        Register
    </Link>
</p>

        </form>
    </div>
</div>

);


}

export default Login;