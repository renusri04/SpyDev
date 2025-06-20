import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from 'recharts';

const salesData = [
  { date: 'Jun 1', sales: 200 },
  { date: 'Jun 2', sales: 340 },
  { date: 'Jun 3', sales: 220 },
  { date: 'Jun 4', sales: 280 },
  { date: 'Jun 5', sales: 300 },
];

const inventoryData = [
  { name: 'Product A', quantity: 5, threshold: 10 },
  { name: 'Product B', quantity: 100, threshold: 30 },
  { name: 'Product C', quantity: 0, threshold: 10 },
];

const profitData = [
  { name: 'Product A', profit: 300 },
  { name: 'Product B', profit: 120 },
  { name: 'Product C', profit: -20 },
];

const Dashboard = () => {
  const lowStock = inventoryData.filter(item => item.quantity < item.threshold && item.quantity > 0);
  const deadStock = inventoryData.filter(item => item.quantity === 0);
  const overStock = inventoryData.filter(item => item.quantity > item.threshold * 2);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">📈 Inventory Dashboard</h1>

      <section className="mb-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Sales Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="mb-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">📉 Low Stock</h2>
        <ul className="list-disc pl-6 mb-6 text-slate-600">
          {lowStock.map(item => (
            <li key={item.name} className="mb-1">{item.name}: {item.quantity} units</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">❌ Dead Stock</h2>
        <ul className="list-disc pl-6 mb-6 text-slate-600">
          {deadStock.map(item => (
            <li key={item.name} className="mb-1">{item.name}: Out of stock</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">📦 Overstocked Items</h2>
        <ul className="list-disc pl-6 text-slate-600">
          {overStock.map(item => (
            <li key={item.name} className="mb-1">{item.name}: {item.quantity} units</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">💰 Profit Analysis</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="profit" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="mb-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">📌 Suggestions</h2>
        <ul className="list-disc pl-6 text-slate-600">
          {lowStock.length > 0 && (
            <li className="mb-1">Reorder low stock items promptly to avoid shortages.</li>
          )}
          {overStock.length > 0 && (
            <li className="mb-1">Review overstocked items and consider promotions or discounts.</li>
          )}
          {deadStock.length > 0 && (
            <li className="mb-1">Investigate reasons for dead stock — consider delisting or repurposing.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;