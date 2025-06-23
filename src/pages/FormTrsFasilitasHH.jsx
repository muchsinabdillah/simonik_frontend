import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Container, Row, Col, Input, Label, FormGroup } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

const FormTrsFasilitasHH = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    id: "",
    tanggal: "",
    monitoring: "",
    nilai: "",
    unit: "",
    userMonitoring: ""
  });

  const [dataList, setDataList] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTambahkan = () => {
    if (!formData.tanggal || !formData.monitoring) {
      alert("Mohon lengkapi minimal Tanggal dan Monitoring.");
      return;
    }

    setDataList(prev => [...prev, formData]);
    setFormData({ id: "", tanggal: "", monitoring: "", nilai: "", unit: "", userMonitoring: "" });
  };

  const handleSimpan = () => {
    console.log("Data disimpan:", dataList);
  };

  const handleBatal = () => navigate("/simonik/fasilitas-hh");

  const columns = [
    { name: "No", selector: (_, index) => index + 1, width: "70px" },
    { name: "Tanggal", selector: row => row.tanggal },
    { name: "Monitoring", selector: row => row.monitoring },
    { name: "Nilai", selector: row => row.nilai },
    { name: "Unit", selector: row => row.unit },
    { name: "User Monitoring", selector: row => row.userMonitoring },
    {
      name: "Aksi",
      cell: (row, index) => (
        <Button color="danger" size="sm" onClick={() => {
          setDataList(dataList.filter((_, i) => i !== index));
        }}>
          Hapus
        </Button>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#8B0A0A",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px"
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingTop: "8px",
        paddingBottom: "8px"
      }
    },
    table: {
      style: {
        border: "1px solid #ccc",
        borderRadius: "6px",
        overflow: "hidden"
      }
    }
  };

  return (
    <Container className="my-3 bg-white rounded shadow p-4">
      <h4 className="fw-bold text-dark mb-3">Form Fasilitas Hand Hygiene</h4>

      <div className="border rounded p-3 mb-4">
        {[
          { label: "ID", name: "id" },
          { label: "Tanggal/ Waktu", name: "tanggal", type: "datetime-local" },
          { label: "Monitoring", name: "monitoring" },
          { label: "Nilai", name: "nilai", type: "select" },
          { label: "Unit", name: "unit" },
          { label: "User Monitoring", name: "userMonitoring" }
        ].map(({ label, name, type = "text" }, index) => (
          <FormGroup row key={index}>
            <Label for={name} sm={3} className="fw-semibold">{label} :</Label>
            <Col sm={9}>
              {name === "nilai" ? (
                <Input
                  type="select"
                  name="nilai"
                  id="nilai"
                  value={formData.nilai}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih --</option>
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
                  <option value="2">N/A</option>
                </Input>
              ) : (
                <Input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              )}
            </Col>
          </FormGroup>
        ))}

        <div className="d-flex justify-content-end">
          <Button
            size="md"
            onClick={handleTambahkan}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover ? "#a40f0f" : "#8B0A0A",
              borderColor: hover ? "#a40f0f" : "#8B0A0A",
              color: "white",
              fontWeight: "bold",
              marginTop: "5vh"
            }}
          >
            + Tambahkan
          </Button>
        </div>
      </div>

      <div className="border rounded p-2 mb-3">
        <DataTable
          columns={columns}
          data={dataList}
          customStyles={customStyles}
          noDataComponent={<div className="text-muted">Belum ada data</div>}
          pagination
          striped
          dense
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button style={{ backgroundColor: "#8B0A0A", borderColor: "#8B0A0A" }} onClick={handleSimpan}>Simpan</Button>
        <Button color="secondary" onClick={handleBatal}>Batal</Button>
      </div>
    </Container>
  );
};

export default FormTrsFasilitasHH;
