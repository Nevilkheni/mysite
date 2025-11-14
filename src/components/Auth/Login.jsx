import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--header-text)" }}>
          Welcome Back 👋
        </h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 input"
        />

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full px-4 py-2 mb-6 input"
        />

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
