

import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold">Dashboard ({auth.currentUser?.email})</h2>
      <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}

export default Navbar;
