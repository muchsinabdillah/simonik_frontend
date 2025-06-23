import React from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Fasilitas HH", route: "/simonik/fasilitas-hh", icon: "/public/fasilitas-hh.png" },
  { title: "Limbah Infeksius", route: "/simonik/monitoring/2", icon: "/public/limbah-infeksius.png" },
  { title: "Linen", route: "/simonik/monitoring/3", icon: "/public/linen.png" },
  { title: "Gizi", route: "/simonik/monitoring/4", icon: "/public/gizi.png" },
  { title: "Kamar Jenazah", route: "/simonik/monitoring/5", icon: "/public/kamar-jenazah.png" },
  { title: "Ruang Perawatan", route: "/simonik/monitoring/6", icon: "/public/ruang-perawatan.png" },
  { title: "Benda Tajam", route: "/simonik/monitoring/7", icon: "/public/benda-tajam.png" },
  { title: "Ruang CSSD", route: "/simonik/monitoring/8", icon: "/public/ruang-cssd.png" },
  { title: "Etika Batuk", route: "/simonik/monitoring/9", icon: "/public/etika-batuk.png" },
  { title: "Praktek Lumbal Punksi", route: "/simonik/monito ring/10", icon: "/public/praktek-lumbal-punksi.png" },
  { title: "Isolasi", route: "/simonik/monitoring/11", icon: "/public/isolasi.png" },
  { title: "Kamar Bedah", route: "/simonik/monitoring/12", icon: "/public/kamar-bedah.png" },
  { title: "Penyuntikan Aman", route: "/simonik/monitoring/13", icon: "/public/penyuntikan-aman.png" },
  { title: "Supervisi CS", route: "/simonik/monitoring/14", icon: "/public/supervisi-cs.png" },
  { title: "Darah dan Komponen Darah", route: "/simonik/monitoring/15", icon: "/public/komponen-darah.png" },
  { title: "Laporan Pajanan", route: "/simonik/monitoring/16", icon: "/public/laporan-pajanan.png" },
];

const MonitoringMenu = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "6px",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: "1200px",
          boxShadow: "0 10px 30px rgba(160, 161, 160, 0.43)",
        }}
      >
        <h2 style={{ marginBottom: "2rem", fontWeight: "600" }}>
        </h2>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 kolom
    gap: "40px",
    justifyContent: "center",
  }}
>
  {menuItems.map((item, index) => (
    <MenuBox key={index} item={item} handleClick={handleClick} />
  ))}
</div>

      </div>
    </div>
  );
};

const MenuBox = ({ item, handleClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      cursor: "pointer",
      textAlign: "center",
      gap: "10px",
    }}
  >
    <img
      src={item.icon}
      alt={item.title}
      onClick={() => handleClick(item.route)}
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
    <div
      className="fw-bold"
      onClick={() => handleClick(item.route)}
      style={{ fontSize: "14px", cursor: "pointer" }}
    >
      {item.title}
    </div>
  </div>
);

export default MonitoringMenu;
