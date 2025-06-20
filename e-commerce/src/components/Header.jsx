import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Header = ({ onAddInventory }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/">InventoryPro</Link>
        </h1>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/inventory" className="hover:text-blue-400 transition">Inventory</Link>

          {user && (
            <button
              onClick={onAddInventory}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded text-sm sm:text-base transition"
            >
              ➕ Add Inventory
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm sm:text-base transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded text-sm sm:text-base transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
