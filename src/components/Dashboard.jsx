// src/components/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { getProducts } from "../utils/localStorage";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState({});
  const dashboardRef = useRef();

  useEffect(() => {
    const data = getProducts();
    setProducts(data);
    computeMonthlySales(data);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const sumRevenue = (fromDate) =>
    products
      .filter((p) => p.date >= fromDate)
      .reduce((acc, p) => acc + (p.finalPrice || p.price) * p.quantity, 0);

  const top = [...products]
    .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
    .slice(0, 5);
  const low = products.filter((p) => p.quantity < 5);
  const over = products.filter((p) => p.quantity > 80);
  const dead = products.filter(
    (p) => Date.now() - new Date(p.date) > 30 * 24 * 60 * 60 * 1000
  );

  const profit = products.reduce((sum, p) => {
    const cost = p.price * 0.7;
    const rev = (p.finalPrice || p.price) * p.quantity;
    return sum + (rev - cost * p.quantity);
  }, 0);

  const computeMonthlySales = (data) => {
    const map = {};
    data.forEach((p) => {
      const mon = new Date(p.date).toLocaleDateString("default", { month: "short", year: "numeric" });
      const rev = (p.finalPrice || p.price) * p.quantity;
      map[mon] = (map[mon] || 0) + rev;
    });
    setSalesByMonth(map);
  };

  const chart = {
    labels: Object.keys(salesByMonth),
    datasets: [
      {
        label: "Monthly Revenue",
        data: Object.values(salesByMonth),
        fill: true,
        backgroundColor: "rgba(59,130,246,0.3)",
        borderColor: "rgba(59,130,246,0.8)",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  const exportToPDF = () => {
    html2canvas(dashboardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8" ref={dashboardRef}>
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        📊 Inventory Dashboard
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={exportToPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {[["Today", sumRevenue(today)], ["This Week", sumRevenue(lastWeek)], ["This Month", sumRevenue(lastMonth)]].map(([label, value]) => (
          <div key={label} className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
            <p className="text-xl tracking-wider">{label} Sales</p>
            <p className="text-3xl font-bold mt-2">₹{value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4">📈 Monthly Revenue Trend</h2>
        <Line data={chart} options={{
          scales: {
            x: { grid: { display: false }, ticks: { color: "#cbd5e1" } },
            y: { grid: { color: "#334155" }, ticks: { color: "#cbd5e1" } },
          },
          plugins: { legend: { labels: { color: "#cbd5e1" } } },
        }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4">🔥 Top-Selling Products</h2>
          <ol className="list-decimal list-inside space-y-2">
            {top.map((p, idx) => (
              <li key={idx} className="bg-gray-700 rounded p-2">{p.name} — {p.quantity} pcs</li>
            ))}
          </ol>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <h2 className="text-xl font-bold mb-4">📣 Alerts</h2>
          <ul className="space-y-2">
            <li className="text-yellow-300">Low Stock: {low.length}</li>
            <li className="text-green-300">Overstocked: {over.length}</li>
            <li className="text-red-400">Dead Stock: {dead.length}</li>
          </ul>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-pink-700 to-pink-500 p-6 rounded-2xl shadow-2xl hover:scale-105 transition">
        <h2 className="text-2xl font-bold">💰 Estimated Profit</h2>
        <p className="text-4xl font-extrabold mt-2">₹{profit.toFixed(2)}</p>
      </div>
    </div>
  );
}
