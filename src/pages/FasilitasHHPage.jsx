import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Container, Row, Col, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

const FasilitasHHPage = () => {
  const [bulan, setBulan] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setBulan(e.target.value);

  const handleEdit = (row) => {
    navigate("/simonik/fasilitas-hh/form-trs-fasilitashh", { state: row });
  };

  const dataList = Array.from({ length: 5 }).map((_, index) => ({
    no: index + 1,
    tanggal: "2025-06-20",
    tipe: "Lorem ipsum dolor sit",
    hasil: "Memahami pentingnya HH",
    user: "Dr. Sinta"
  }));

  const columns = [
    { name: "No", selector: row => row.no, width: "70px" },
    { name: "Tanggal", selector: row => row.tanggal },
    { name: "Tipe", selector: row => row.tipe },
    { name: "Hasil", selector: row => row.hasil },
    { name: "User", selector: row => row.user },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button color="primary" size="sm" onClick={() => handleEdit(row)}>Edit</Button>
          <Button color="danger" size="sm">Hapus</Button>
        </div>
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
      <Row className="align-items-center mb-3">
        <Col xs="12" md="6" className="d-flex align-items-center">
          <h4 className="fw-bold text-dark mb-0">List Fasilitas Hand Hygiene</h4>
          <Button
            color="danger"
            className="fw-bold rounded-pill px-3 ms-3"
            style={{ whiteSpace: "nowrap", fontSize: "12px" }}
            onClick={() => navigate("/simonik/fasilitas-hh/form-trs-fasilitashh")}
          >
            + | Tambahkan
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-4">
        <Col xs="12" md="3">
          <label htmlFor="bulan" className="form-label fw-semibold">
            Bulan
          </label>
          <Input
            type="select"
            id="bulan"
            name="bulan"
            value={bulan}
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          >
            <option value="">Pilih Bulan</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </Input>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={dataList}
        customStyles={customStyles}
        noDataComponent={<div className="text-muted">Belum ada data</div>}
        pagination
        striped
        dense
      />
    </Container>
  );
};

export default FasilitasHHPage;
