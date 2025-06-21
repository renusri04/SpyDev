import React, { useEffect, useState } from "react";
import { getProducts } from "../utils/localStorage";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [sortField, setSortField] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const storedProducts = getProducts();
    setProducts(storedProducts);
  }, []);

  const deleteProduct = (indexToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updated = products.filter((_, index) => index !== indexToDelete);
      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(updated);
    }
  };

  const sortProducts = (items) => {
    return [...items].sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "name") return a.name.localeCompare(b.name);
      if (sortField === "price") return a.price - b.price;
      if (sortField === "finalPrice") return a.finalPrice - b.finalPrice;
      if (sortField === "date") return new Date(a.date) - new Date(b.date);
      if (sortField === "category") return a.category.localeCompare(b.category);
      return 0;
    });
  };

  const filteredProducts = products.filter((product) =>
    categoryFilter ? product.category === categoryFilter : true
  );

  const sortedProducts = sortProducts(filteredProducts);
  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const exportToCSV = (data, filename = "inventory.csv") => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  data.forEach((row) => {
    const values = headers.map((header) => {
      const val = row[header] ?? "";
      return `"${val.toString().replace(/"/g, '""')}"`; // Escape quotes
    });
    csvRows.push(values.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        🧾 Inventory List
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 shadow">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Original Price</option>
          <option value="finalPrice">Discounted Price</option>
          <option value="date">Date</option>
          <option value="category">Category</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 shadow">
          <option value="">Filter by Category</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {sortedProducts.length > 0 && (
  <button
    onClick={() => exportToCSV(sortedProducts)}
    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
  >
    Export as CSV
  </button>
)}


      {sortedProducts.length === 0 ? (
        <p className="text-gray-400">No products available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-200 bg-gray-900">
            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Discount %</th>
                <th className="px-6 py-3">Final Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category || "N/A"}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">{product.discount ?? 0}%</td>
                  <td className="px-6 py-4 font-medium text-green-400">₹{product.finalPrice ?? product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.date}</td>
                  <td className="px-6 py-4">{product.description || "N/A"}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => deleteProduct(index)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-white text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
