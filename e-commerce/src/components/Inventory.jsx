import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";

const Inventory = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 pt-24">
      {/* 🔹 Add Inventory Button (only for logged-in users) */}
      {user && (
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-6"
        >
          ➕ Add Inventory
        </button>
      )}

      {/* 🔹 Modal */}
      {showModal && (
        <div className="bg-black bg-opacity-60 fixed inset-0 flex items-center justify-center z-50">
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
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Existing Inventory Section (keep your current code/content here) */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Inventory</h2>
        <p className="text-gray-600">This is your existing inventory section.</p>
        {/* Add your actual inventory listing or table here */}
      </div>
    </div>
  );
};

export default Inventory;
