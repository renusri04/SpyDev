// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-90 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="mb-4 md:mb-0">
          <span className="text-lg font-semibold text-white">🛒 My Inventory App</span>
        </div>

        {/* Center - Navigation */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link to="/inventory" className="hover:text-white transition">Inventory</Link>
          <Link to="/add-inventory" className="hover:text-white transition">Add Inventory</Link>
          <Link to="/auth" className="hover:text-white transition">Login</Link>
        </nav>

        {/* Right Side - Copyright */}
        <div className="text-xs mt-4 md:mt-0 text-gray-500">
          © {new Date().getFullYear()} Inventory Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
