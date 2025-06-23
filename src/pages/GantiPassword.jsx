import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'; 


const GantiPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // ngapus error pas mulai ngetik
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = "Password lama wajib diisi";
    if (!formData.newPassword) newErrors.newPassword = "Password baru wajib diisi";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Konfirmasi password wajib diisi";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      console.log("Submit berhasil:", formData);
    }
  };

  return (
    <div
      style={{
        minHeight: "78vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "6px",
          padding: "3rem 2rem",
          width: "100%",
          height: "700px",
          maxWidth: "1450px",
          boxShadow: "0 10px 30px rgba(160, 161, 160, 0.43)",
          textAlign: "left",
        }}
      >
        <h2 style={{ marginBottom: "2rem", fontWeight: "600", fontStyle:"bold" }}>Ubah Password Anda</h2>

        <form style={{ maxWidth: "1000px",  }} onSubmit={handleSubmit}>
          <PasswordInput
            label="Password Lama"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Masukan password lama"
            error={errors.oldPassword}
          />
          <PasswordInput
            label="Password Baru"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Masukan password baru"
            error={errors.newPassword}
          />
          <PasswordInput
            label="Konfirmasi Password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Konfirmasi password baru"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            style={{
              borderRadius: "0.5rem",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              backgroundColor: "#8B0A0A",
              color: "white",
              border: "none",
              marginTop: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#6e0808")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B0A0A")}
          >
            Ubah Password
          </button>
        </form>

        {/* <div style={{ marginTop: "1.5rem" }}>
          <a
            href="/forgot-password"
            style={{ color: "#2563eb", textDecoration: "none", fontSize: "0.9rem" }}
          >
            Lupa Password?
          </a>
        </div> */}
      </div>
    </div>
  );
};

const PasswordInput = ({ label, id, name, value, onChange, placeholder, error }) => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false); // Untuk efek border biru

  return (
    <div style={{ marginBottom: "1.5rem", position: "relative" }}>
      <label
        htmlFor={id}
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={visible ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            borderRadius: "0.5rem",
            padding: "0.75rem 2.5rem 0.75rem 0.75rem",
            border: error
              ? "1px solid #dc3545" // merah kalau error
              : focused
              ? "1px solid #2563eb" // biru kalau fokus
              : "1px solid #ced4da", // abu default
            width: "100%",
            outline: "none",
            transition: "border 0.3s ease",
          }}
        />
        <span
          onClick={() => setVisible(!visible)}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#6c757d",
          }}
          title={visible ? "Sembunyikan" : "Tampilkan"}
        >
          <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`}></i>
        </span>

      </div>
      {error && (
        <div style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          {error}
        </div>
      )}
    </div>
  );
};


export default GantiPassword;
