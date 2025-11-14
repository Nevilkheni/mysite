
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

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
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--header-text)" }}>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="w-full py-2 btn-primary">
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;
