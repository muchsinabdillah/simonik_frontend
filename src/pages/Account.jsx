import React, { useState, useEffect } from "react";
import { getUser, getPegawaiByUUID } from "../services/pegawai";
import { getToken } from "../helpers/config";

const Account = () => {
  const [formData, setFormData] = useState({
    nama: "",
    department: "",
    unit: "",
    profesi: "",
  });

  const [errors, setErrors] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/90?text=Foto");

  // Ambil data dari API saat halaman dimuat
  useEffect(() => {
    const fetchPegawaiData = async () => {
      try {
        const token = getToken() || "32|mFw5zjKXkSMQgcUaW2arCBKJzlSwJnZXYOYxQWh147365188";
        const user = await getUser(token);
        const pegawai = await getPegawaiByUUID(user.uuid_employee, token);

        setFormData({
          nama: pegawai.data.employee_name || "",
          department: pegawai.data.department?.name || "",
          unit: pegawai.data.unit?.name || "",
          profesi: pegawai.data.profesi?.name || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data pegawai:", error);
      }
    };

    fetchPegawaiData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama wajib diisi";
    if (!formData.department) newErrors.department = "Department wajib diisi";
    if (!formData.unit) newErrors.unit = "Unit wajib diisi";
    if (!formData.profesi) newErrors.profesi = "Profesi wajib diisi";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submit berhasil:", formData);
      alert("Data berhasil disimpan!");
    }
  };

  return (
    <div
      style={{
        minHeight: "74vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "6px",
          padding: "3rem 2rem",
          width: "100%",
          maxWidth: "1450px",
          boxShadow: "0 10px 30px rgba(160, 161, 160, 0.43)",
          textAlign: "left",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Account</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Foto Profil */}
            {/* <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  overflow: "hidden",
                }}
              >
                {profilePhoto && (
                  <img
                    src={profilePhoto}
                    alt="Foto Profil"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              <label
                htmlFor="photo-upload"
                style={{
                  color: "#2563eb",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Ganti foto profil
              </label>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </div> */}

            {/* Inputan Form */}
            <Input
              label="Nama"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama anda"
              error={errors.nama}
            />
            <Input
              label="Departemen"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Masukkan department anda"
              error={errors.department}
            />
            <Input
              label="Unit"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Masukkan unit anda"
              error={errors.unit}
            />
            <Input
              label="Profesi"
              id="profesi"
              name="profesi"
              value={formData.profesi}
              onChange={handleChange}
              placeholder="Masukkan profesi anda"
              error={errors.profesi}
            />

            {/* Tombol Simpan */}
            <button
              type="submit"
              style={{
                borderRadius: "0.5rem",
                padding: "0.75rem 1.5rem",
                fontWeight: "600",
                backgroundColor: "#8B0A0A",
                color: "white",
                border: "none",
                marginTop: "2rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6e0808")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B0A0A")}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, id, name, value, onChange, placeholder, error }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.5rem", position: "relative" }}>
      <label
        htmlFor={id}
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          borderRadius: "0.5rem",
          padding: "0.75rem",
          border: error
            ? "1px solid #dc3545"
            : focused
            ? "1px solid #2563eb"
            : "1px solid #ced4da",
          width: "100%",
          outline: "none",
          transition: "border 0.3s ease",
        }}
      />
      {error && (
        <div
          style={{
            color: "#dc3545",
            fontSize: "0.85rem",
            marginTop: "0.25rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Account;
