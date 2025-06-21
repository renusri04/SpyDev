// src/pages/AddInventory.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

const AddInventory = () => {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");
  const [error, setError] = useState(null);

  const [manualEntry, setManualEntry] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    discount: "",
    date: "",
    description: "",
  });

  const saveToLocalStorage = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const getExistingProducts = () => {
    return JSON.parse(localStorage.getItem("products") || "[]");
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const finalPrice =
      manualEntry.price - (manualEntry.price * (manualEntry.discount ?? 0)) / 100;

    const newProduct = {
      ...manualEntry,
      price: parseFloat(manualEntry.price),
      discount: parseFloat(manualEntry.discount),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
    };

    const updated = [...getExistingProducts(), newProduct];
    saveToLocalStorage(updated);

    setManualEntry({
      name: "",
      category: "",
      price: "",
      quantity: "",
      discount: "",
      date: "",
      description: "",
    });
    setError(null);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data.map((item) => {
          const price = parseFloat(item.price || 0);
          const discount = parseFloat(item.discount || 0);
          const finalPrice = price - (price * discount) / 100;
          return {
            ...item,
            price,
            discount,
            finalPrice: parseFloat(finalPrice.toFixed(2)),
          };
        });

        const updated = [...getExistingProducts(), ...parsed];
        saveToLocalStorage(updated);
        setError(null);
      },
      error: (err) => {
        console.error(err);
        setError("Failed to parse CSV");
      },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add Inventory - {mode === "csv" ? "CSV Upload" : "Manual Entry"}</h2>

      {mode === "manual" && (
        <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" value={manualEntry.name} onChange={(e) => setManualEntry({ ...manualEntry, name: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="Category" value={manualEntry.category} onChange={(e) => setManualEntry({ ...manualEntry, category: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="number" placeholder="Price" value={manualEntry.price} onChange={(e) => setManualEntry({ ...manualEntry, price: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="number" placeholder="Discount %" value={manualEntry.discount} onChange={(e) => setManualEntry({ ...manualEntry, discount: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="number" placeholder="Quantity" value={manualEntry.quantity} onChange={(e) => setManualEntry({ ...manualEntry, quantity: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="date" placeholder="Date" value={manualEntry.date} onChange={(e) => setManualEntry({ ...manualEntry, date: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Description" value={manualEntry.description} onChange={(e) => setManualEntry({ ...manualEntry, description: e.target.value })} className="col-span-2 border px-3 py-2 rounded" />
          <button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">Add Product</button>
        </form>
      )}

      {mode === "csv" && (
        <div className="space-y-4">
          <input type="file" accept=".csv" onChange={handleCSVUpload} className="border px-4 py-2 rounded" />
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-sm text-gray-600">Upload a CSV with headers like: name, category, price, discount, quantity, date, description</p>
        </div>
      )}
    </div>
  );
};

export default AddInventory;
