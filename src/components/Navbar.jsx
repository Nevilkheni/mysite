import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser"); // ✅ remove user
    navigate("/", { replace: true }); // ✅ redirect to login
  };

  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold">Welcome, {user?.name || "User"}</h2>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
