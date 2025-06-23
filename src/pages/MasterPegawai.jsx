import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody
} from "reactstrap";
import Select from "react-select";

import {
  getpegawaiall, postpegawai, updatepegawai, deletepegawai
} from "../services/MasterPegawai";
import { getdepartmentall } from "../services/MasterDepartement";
import { getunitall } from "../services/MasterUnit";
import { getprofesiall } from "../services/MasterProfesi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MasterPegawai = () => {
  const accessToken = localStorage.getItem("token");
  const [datapegawai, setDataPegawai] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Opsi
  const [per_page, setPerPage] = useState(10);
  
  // Form State
  const [uuid, setUuid] = useState("");
  const [employee_name, setEmployeName] = useState("");
  const [status, setStatus] = useState("");
  const [uuid_department, setDepartment] = useState("");
  const [uuid_unit, setUnit] = useState("");
  const [uuid_profesi, setProfesi] = useState("");

  // Options
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [profesiOptions, setProfesiOptions] = useState([]);

  const toggleModal = () => {
    setUuid("");
    setEmployeName("");
    setStatus("");
    setDepartment("");
    setUnit("");
    setProfesi("");
    setModalOpen(!modalOpen);
  };

  const columns = [
    { name: "No", cell: (row, index) => index + 1, width: "60px" },
    { name: "Nama", selector: (row) => row.employee_name, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status === "1" ? "Aktif" : "Tidak Aktif", sortable: true,
    },
    {
      name: "Departemen",
      selector: (row) => row.department?.name || "-", sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit?.name || "-", sortable: true,
    },
    {
      name: "Profesi",
      selector: (row) => row.profesi?.name || "-", sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button onClick={() => handleEdit(row)} style={{ color: "white", backgroundColor: "rgb(5, 143, 255)", border: "none", borderRadius: "3px", padding: "5px 7px" }}>
            Edit
          </button>
          <button onClick={() => handleDelete(row)} style={{ color: "white", backgroundColor: "rgb(236, 33, 15)", border: "none", borderRadius: "3px", padding: "5px 7px" }}>
            Hapus
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (row) => {
    setUuid(row.uuid);
    setEmployeName(row.employee_name);
    setStatus(row.status);
    setDepartment(row.uuid_department);
    setUnit(row.uuid_unit);
    setProfesi(row.profesi_uuid);
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Yakin ingin menghapus ${row.employee_name}?`)) return;
    try {
      await deletepegawai(row.uuid, accessToken);
      toast.success("Data berhasil dihapus");
      handleGetPegawaiAll();
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!employee_name || !status || !uuid_department || !uuid_unit || !uuid_profesi) {
      toast.error("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    const data = {
      uuid: uuid || "",
      employee_name,
      status,
      uuid_department,
      uuid_unit,
      profesi_uuid: uuid_profesi,
    };

    try {
      const response = uuid
        ? await updatepegawai(data, accessToken)
        : await postpegawai(data, accessToken);

      toast.success(response.message || "Data berhasil disimpan");
      toggleModal();
      handleGetPegawaiAll();
    } catch (err) {
      toast.error("Gagal menyimpan data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetPegawaiAll = async () => {
    try {
      const res = await getpegawaiall(accessToken);
      setDataPegawai(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data pegawai");
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [dept, unit, prof] = await Promise.all([
        getdepartmentall(accessToken),
        getunitall(accessToken),
        getprofesiall(accessToken),
      ]);
      setDepartmentOptions(dept.data.map(d => ({ value: d.uuid, label: d.name })));
      setUnitOptions(unit.data.map(u => ({ value: u.uuid, label: u.name })));
      setProfesiOptions(prof.data.map(p => ({ value: p.uuid, label: p.name })));
    } catch (err) {
      toast.error("Gagal mengambil data dropdown");
    }
  };

  useEffect(() => {
    handleGetPegawaiAll();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    const filtered = datapegawai.filter(item => {
      const statusText = item.status === "1" ? "Aktif" : "Tidak Aktif";
      const departmentName = item.department?.name || "";
      const unitName = item.unit?.name || "";
      const profesiName = item.profesi?.name || "";

      const combinedString = `
        ${item.employee_name || ""}
        ${statusText}
        ${departmentName}
        ${unitName}
        ${profesiName}
      `.toLowerCase();

      return combinedString.includes(searchText.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchText, datapegawai]);

   const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#800000", // merah hati
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        border: "1px solid #ccc", // garis header
      },
    },
    cells: {
      style: {
        border: "1px solid #ccc", // garis kolom
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #ccc", // garis antar baris
      },
    },
  };

  return (
    <Container className="my-3 bg-white rounded shadow p-4">
    {/* <Container fluid style={{ width: "98%", height: "98vh", padding: "1%", margin: "1%", backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)",}}> */}
      <Row className="align-items-center mb-3">
        <Col xs="10" md="6" className="d-flex align-items-center">
          <h4 className="fw-bold text-dark mb-0">List Master Pegawai</h4>
          <Button
            color="danger"
            className="fw-bold rounded-pill px-3 ms-3"
            style={{ whiteSpace: "nowrap", fontSize: "12px" }}
            onClick={toggleModal}
          >
            + | ADD NEW
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-4">
        <Col xs="12" md="12" className="text-md-end">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            style={{
              maxWidth: "300px",
              display: "inline-block",
              borderRadius: "10px",
            }}
          />
        </Col>
      </Row>

      {/* <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      /> */}

      <div className="mt-4">
              <DataTable
                columns={columns}
                data={Array.isArray(filteredData) ? filteredData : []}
                progressPending={loading}
                pagination
                paginationPerPage={per_page}
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                highlightOnHover
                striped
                responsive
                dense
                customStyles={customStyles}
              />
            </div>

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Form Pegawai</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}><label>Nama Pegawai</label></Col>
              <Col md={8}>
                <Input
                  value={employee_name}
                  onChange={(e) => setEmployeName(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}><label>Status</label></Col>
              <Col md={8}>
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">-- PILIH --</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </Input>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}><label>Departemen</label></Col>
              <Col md={8}>
                <Select
                  options={departmentOptions}
                  value={departmentOptions.find(opt => opt.value === uuid_department)}
                  onChange={(e) => setDepartment(e?.value || "")}
                  isClearable
                  placeholder="Pilih Departemen"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}><label>Unit</label></Col>
              <Col md={8}>
                <Select
                  options={unitOptions}
                  value={unitOptions.find(opt => opt.value === uuid_unit)}
                  onChange={(e) => setUnit(e?.value || "")}
                  isClearable
                  placeholder="Pilih Unit"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}><label>Profesi</label></Col>
              <Col md={8}>
                <Select
                  options={profesiOptions}
                  value={profesiOptions.find(opt => opt.value === uuid_profesi)}
                  onChange={(e) => setProfesi(e?.value || "")}
                  isClearable
                  placeholder="Pilih Profesi"
                />
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? "Menyimpan..." : "SIMPAN"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default MasterPegawai;
