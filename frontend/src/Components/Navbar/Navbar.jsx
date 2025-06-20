import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    buyingPrice: '',
    sellingPrice: '',
    category: '',
    purchaseDate: '',
    expiryDate: '',
    description: '',
  });

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setShowManualForm(false);
    setFormData({
      name: '',
      quantity: '',
      buyingPrice: '',
      sellingPrice: '',
      category: '',
      purchaseDate: '',
      expiryDate: '',
      description: '',
    });
  };

  const handleManualClick = () => {
    setShowManualForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    toggleModal();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-slate-900 text-white px-8 py-4">
        <div className="text-2xl font-bold">📊 InventoryPro</div>
        <ul className="flex gap-6 list-none">
          <li><Link to="/home" className="text-slate-300 font-medium hover:text-sky-400 transition">Home</Link></li>
          <li><Link to="/dashboard" className="text-slate-300 font-medium hover:text-sky-400 transition">Dashboard</Link></li>
          <li><Link to="/inventory" className="text-slate-300 font-medium hover:text-sky-400 transition">Inventory</Link></li>
          <li><Link to="/logout" className="text-slate-300 font-medium hover:text-sky-400 transition">Logout</Link></li>
        </ul>
        <button
          onClick={toggleModal}
          className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md font-medium transition"
        >
          + Add Inventory
        </button>
      </nav>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-80 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-8 rounded-xl w-80 shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!showManualForm ? (
              <>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Add Inventory</h2>
                <p className="text-slate-600 mb-4">Select method to add items:</p>
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium"
                    onClick={handleManualClick}
                  >
                    Manual Entry
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-medium"
                    onClick={() => alert('CSV Upload functionality coming soon!')}
                  >
                    CSV Upload
                  </button>
                </div>
                <button
                  onClick={toggleModal}
                  className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Manual Inventory Entry</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
                  <input type="text" name="name" placeholder="Product Name" required value={formData.name} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="number" name="quantity" placeholder="Quantity" required value={formData.quantity} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="number" name="buyingPrice" placeholder="Buying Price" required value={formData.buyingPrice} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="number" name="sellingPrice" placeholder="Selling Price" required value={formData.sellingPrice} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
                  <textarea name="description" placeholder="Description (optional)" rows="3" value={formData.description} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2"></textarea>

                  <div className="flex flex-col gap-2 mt-3">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md font-medium">Submit</button>
                    <button type="button" onClick={toggleModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md font-medium">Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;