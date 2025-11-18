
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto card">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Reset Password</h2>
      <div className="mb-4">
        <Link to="/login" className="inline-flex items-center gap-2 site-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back to Login</span>
        </Link>
      </div>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="w-full py-2 btn-primary" title="Send reset link">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
          <span>Send Reset Link</span>
        </span>
      </button>
    </div>
  );
}

export default ForgotPassword;
