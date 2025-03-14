import { useState } from "react";
import { signInWithGoogle } from "../firebase"; // Firebase only for Google
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call backend for email/password authentication
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Store token & navigate to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <img src="/assets/logo.png" alt="Logo" />
        <p>Simplifying Room Rentals</p>
        <img src="/assets/illustration.jpg" alt="Illustration" className="illustration" />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>Welcome Back 🤝</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="bordered-btn">Login</button>
        </form>

        <p className="or-divider">- OR -</p>
        <button className="google-btn" onClick={signInWithGoogle}>Continue with Google</button>

        <p>Don't have an account? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}

export default Login;
