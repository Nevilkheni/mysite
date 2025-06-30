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
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg p-4 rounded-xl mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold tracking-wide">
          🔗 LinkVault
        </div>

        <div className="flex items-center space-x-4">
          {auth.currentUser?.email && (
            <span className="text-white text-sm sm:text-base font-medium">
              {auth.currentUser.email}
            </span>
          )}
          <button
            onClick={logout}
            className="bg-white text-purple-700 hover:bg-purple-100 font-semibold px-4 py-2 rounded-full transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
