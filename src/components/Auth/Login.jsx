import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

const STATIC_EMAIL = "nevilkheni135@gmail.com";
const STATIC_PASSWORD = "6351091508";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    if (data.email === STATIC_EMAIL && data.password === STATIC_PASSWORD) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: STATIC_EMAIL, name: "Static User" })
      );
      navigate("/Dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto mt-24 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-600 mb-2">{errors.email.message}</p>}

      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-600 mb-4">{errors.password.message}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
