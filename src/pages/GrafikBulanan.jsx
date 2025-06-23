import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { bulan: "Jan", total: 40 },
  { bulan: "Feb", total: 55 },
  { bulan: "Mar", total: 30 },
  { bulan: "Apr", total: 75 },
  { bulan: "Mei", total: 60 },
  { bulan: "Jun", total: 90 },
  { bulan: "Jul", total: 70 },
  { bulan: "Agu", total: 50 },
  { bulan: "Sep", total: 80 },
  { bulan: "Okt", total: 45 },
  { bulan: "Nov", total: 65 },
  { bulan: "Des", total: 100 },
];

const GrafikBulanan = () => {
  return (
    <div style={{ padding: "2rem", minHeight: "80vh", backgroundColor: "#f9fafb" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          minHeight: "74vh",

        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>
          Grafik Data Bulanan
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4f46e5" name="Jumlah" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrafikBulanan;
