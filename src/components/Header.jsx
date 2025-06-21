// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Header = ({ onAddInventory }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      await logout();
      alert("✅ Logged out successfully.");
      navigate("/auth");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gray-900 text-white shadow-md px-6 py-9 flex justify-between items-center z-50">
      <h1 className="text-xl font-bold">Inventory System</h1>
      <nav className="flex gap-6 items-center">
  <Link to="/" className="hover:text-blue-400">Home</Link>

  {user ? (
    <>
      <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
      <Link to="/inventory" className="hover:text-blue-400">Inventory</Link>
    </>
  ) : (
    <>
      <Link to="/auth" className="text-gray-400 hover:text-blue-400">Dashboard</Link>
      <Link to="/auth" className="text-gray-400 hover:text-blue-400">Inventory</Link>
    </>
  )}

  {user ? (
    <button
      onClick={onAddInventory}
      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
    >
      Add Inventory
    </button>
  ) : (
    <button
      onClick={() => alert("🚫 Please log in to add inventory.")}
      className="bg-gray-600 cursor-not-allowed px-3 py-1 rounded text-white"
      disabled
    >
      Add Inventory
    </button>
  )}

  {user ? (
    <button
      onClick={handleLogout}
      className="hover:text-red-400 font-medium"
    >
      Logout
    </button>
  ) : (
    <Link to="/auth" className="hover:text-blue-400 font-medium">
      Login
    </Link>
  )}
</nav>

    </header>
  );
};

export default Header;
