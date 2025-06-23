import React from "react";
import { Container } from "reactstrap";

const Home = () => {
  return (
    <div
      style={{
        width: "99vw",
        height: "100vh",
        padding: "1rem", // Jarak sisi luar container
        boxSizing: "border-box",
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-white rounded shadow text-center"
        style={{
          padding: "clamp(1.5rem, 5vw, 3rem)",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Logo SIMONIK */}
        <img
          src="/simonik-home-logo.png"
          alt="Logo SIMONIK"
          style={{
            maxWidth: "220px",
            width: "100%",
            height: "auto",
            marginBottom: "1rem",
          }}
        />
        <h1
          className="fw-bold"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#8B0A0A",
          }}
        >
          SIMONIK
        </h1>
        <h3
          className="fw-bold"
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
            color: "#1e2c5e",
          }}
        >
          Sistem Informasi Monitoring Infeksi
        </h3>
        <p
          className="fst-italic"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            color: "blue",
          }}
        >
          V.1.0
        </p>
      </div>
    </div>
  );
};

export default Home;
