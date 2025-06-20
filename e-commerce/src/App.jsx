import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Auth from "./components/Auth";
import Header from "./components/Header";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openAddInventoryModal = () => setShowModal(true);
  const closeAddInventoryModal = () => setShowModal(false);

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Header onAddInventory={openAddInventoryModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {/* 🔹 Add Inventory Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl w-[320px] text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Add Inventory</h2>
            <p className="text-gray-600 mb-6">Select method to add items:</p>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md mb-3"
              onClick={() => alert("Manual Entry Clicked")}
            >
              Manual Entry
            </button>

            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md mb-3"
              onClick={() => alert("CSV Upload Clicked")}
            >
              CSV Upload
            </button>

            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md"
              onClick={closeAddInventoryModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
