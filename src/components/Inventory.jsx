import React, { useEffect, useState } from "react";
import { getProducts } from "../utils/localStorage";
import { useAuth } from "../contexts/authContext";

export default function Inventory() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      const storedProducts = getProducts(user.uid);
      setProducts(storedProducts);
    }
  }, [user]);

  if (!user) return <p className="text-white p-6">Please login to view your inventory.</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📦 Your Inventory</h1>
      {products.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-700 text-left text-sm uppercase text-gray-400">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Final Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, i) => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-3">{prod.name}</td>
                <td className="p-3">₹{prod.price}</td>
                <td className="p-3 text-green-400">₹{prod.finalPrice}</td>
                <td className="p-3">{prod.quantity}</td>
                <td className="p-3">{prod.category}</td>
                <td className="p-3">{prod.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
