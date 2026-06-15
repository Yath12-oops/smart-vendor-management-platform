
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async (e) => {

    e.preventDefault();

    try {

        await axios.post(
            "http://localhost:8080/auth/register",
            {
                name,
                email,
                password
            }
        );

        alert("Registration Successful");

        navigate("/");

    } catch (error) {

        console.error(error);

        alert("Registration Failed");
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
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
            }}
        >

            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Vendor Registration
            </h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#22c55e",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>

            </form>

            <p
                style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "15px"
                }}
            >
                Already have an account?

                <Link
                    to="/"
                    style={{
                        color: "#60a5fa",
                        marginLeft: "5px"
                    }}
                >
                    Login
                </Link>

            </p>

        </div>

    </div>
);

}

export default Register;
