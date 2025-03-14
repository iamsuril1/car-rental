import { useState } from "react";
import { signInWithGoogle } from "../firebase"; // Firebase only for Google login
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      // Store JWT token & navigate to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="left-section">
        <img src="/assets/logo.png" alt="Logo" />
        <h2>Simplifying Room Rentals</h2>
        <p>List, browse, inspect, and rent securely - all in one place.</p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>Create an account <span><Link to="/">Login instead</Link></span></h2>
        
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" required onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} />
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

          <div className="role-selection">What’s your role?</div>
          <div className="radio-group">
            <label>
              <input type="radio" value="tenant" checked={role === "tenant"} onChange={() => setRole("tenant")} />
              Tenant
            </label>
            <label>
              <input type="radio" value="landlord" checked={role === "landlord"} onChange={() => setRole("landlord")} />
              Landlord
            </label>
          </div>

          <p className="role-selection">
            By signing up, you agree to our <Link to="/terms">Terms & Conditions</Link>.
          </p>

          <button type="submit" className="bordered-btn">Create an account</button>
        </form>

        <p className="or-divider">- OR -</p>
        <button className="google-btn" onClick={signInWithGoogle}>Continue with Google</button>
      </div>
    </div>
  );
}

export default Register;
