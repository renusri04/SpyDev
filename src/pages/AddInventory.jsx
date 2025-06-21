import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { saveManualProduct, saveCSVProducts } from "../utils/localStorage";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Grocery", "Personal Care", "Clothing", "Electronics", "Other"];

export default function AddInventory() {
  const [form, setForm] = useState({
    name: "", sku: "", quantity: "", discount: "", price: "", description: "",
    category: "Grocery", otherCategory: "", date: ""
  });
  const [csvData, setCSVData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p className="text-white p-6">Please login to add inventory.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name || !form.quantity || !form.date || !form.price) {
      alert("❗ Name, price, quantity and date are required.");
      return false;
    }
    if (form.category === "Other" && !form.otherCategory.trim()) {
      alert("❗ Specify category when choosing 'Other'.");
      return false;
    }
    return true;
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const product = {
      name: form.name,
      sku: form.sku?.trim() || undefined,
      quantity: +form.quantity,
      discount: form.discount ? +form.discount : 0,
      price: +form.price,
      finalPrice: form.discount ? (+form.price * (1 - +form.discount / 100)).toFixed(2) : +form.price,
      category: form.category !== "Other" ? form.category : form.otherCategory.trim(),
      description: form.description,
      date: form.date,
    };

    saveManualProduct(user.uid, product);
    alert("✅ Product added");
    setForm({ name: "", sku: "", quantity: "", discount: "", price: "", description: "", category: "Grocery", otherCategory: "", date: "" });
    navigate("/inventory");
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: ({ data, meta }) => {
        const req = ["name", "quantity", "date", "category", "price"];
        for (let col of req) {
          if (!meta.fields.includes(col)) {
            alert(`❌ Missing column "${col}".`);
            return;
          }
        }

        const formatted = data.map((row) => ({
          name: row.name,
          sku: row.sku?.trim() || undefined,
          quantity: +row.quantity,
          price: +row.price,
          discount: row.discount ? +row.discount : 0,
          finalPrice: row.discount ? (+row.price * (1 - +row.discount / 100)).toFixed(2) : +row.price,
          category: CATEGORIES.slice(0, 4).includes(row.category) ? row.category : "Other",
          description: row.description,
          date: row.date
        }));

        setCSVData(formatted);
        alert("✅ CSV ready: click import to save");
      },
      error: (err) => alert("❌ CSV error: " + err.message)
    });
  };

  const handleCSVSave = () => {
    saveCSVProducts(user.uid, csvData);
    alert("✅ Products imported");
    setCSVData(null);
    navigate("/inventory");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">➕ Add Inventory</h1>

      <form onSubmit={handleManualSubmit} className="max-w-xl bg-gray-800 p-6 rounded-lg mx-auto space-y-4">
        {["name", "price", "quantity", "date"].map((k) => (
          <div key={k}>
            <label className="block mb-1 capitalize">{k}</label>
            <input
              name={k}
              type={k === "date" ? "date" : "text"}
              value={form[k]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
        ))}
        <input name="sku" placeholder="SKU (optional)" value={form.sku} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        <input name="discount" type="number" placeholder="Discount % (optional)" value={form.discount} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        <textarea name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {form.category === "Other" && (
          <input name="otherCategory" placeholder="Specify category" value={form.otherCategory} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        )}
        <button type="submit" className="w-full bg-blue-600 py-2 rounded">Add Product</button>
      </form>

      <div className="max-w-xl mt-10 mx-auto bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">📄 Upload CSV</h2>
        <input type="file" accept=".csv" onChange={handleCSVUpload} className="w-full p-2 bg-gray-700 rounded" />
        {csvData && (
          <button onClick={handleCSVSave} className="w-full mt-4 bg-green-600 py-2 rounded">✅ Import CSV</button>
        )}
      </div>
    </div>
  );
}
