import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--text-primary)" }}>
          Welcome Back 👋
        </h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 input"
        />

          <div className="relative">
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-3  text-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.1-2.6 2.96-4.73 5.2-6.1"/><path d="M1 1l22 22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

        <button type="submit" className="w-full py-2 btn-primary">
          Login
        </button>

        <div className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="site-link">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="site-link">
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
