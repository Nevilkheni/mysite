import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Account created!");
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--header-text)" }}>
          Create Account 🚀
        </h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 input"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 input"
        />

        <button type="submit" className="w-full py-2 btn-primary">
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p style={{ color: "var(--muted)" }}>
            Already have an account?  
            <Link to="/Login" className="site-link" style={{ marginLeft: 6 }}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
