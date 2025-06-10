
import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        {...register("email")}
        placeholder="Email"
        className="input w-full px-4 py-2 mb-2 border rounded"
      />
      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="input w-full px-4 py-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
      <p className="mt-4 text-center">
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
        <a href="/forgot-password" className="text-yellow-600 underline">
          Forgot Password?
        </a>
      </p>
    </form>
  );
}

export default Login;
