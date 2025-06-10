
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input {...register("email")} placeholder="Email" className="input w-full px-4 py-2 mb-2 border rounded" />
      <input {...register("password")} placeholder="Password" type="password" className="input w-full px-4 py-2 mb-4 border rounded" />
      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Sign Up</button>
    </form>
  );
}

export default Signup;

