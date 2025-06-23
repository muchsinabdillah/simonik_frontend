import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody
} from "reactstrap";
import {
  getdepartmentall, postdepartment, updatedepartment, deletedepartment
} from "../services/MasterDepartement";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MasterDepartment = () => {
  const [department, setDepartment] = useState("");
  const [datadepartment, setDataDepartment] = useState([]);
  // const accessToken = "4|yYPajvRewHIQGqUx4Kc2UzFjOm2e4lVx3jLvfcXRfd4cea18";
  const accessToken = localStorage.getItem("token");
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleModal = () => { setUuid(""); setName(""); setStatus(""); setModalOpen(!modalOpen); };
  const [per_page, setPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [errors, setErrors] = useState("");

  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [status, setStatus] = useState("");

  const handleEdit = (row) => {
    setUuid(row.uuid);
    setName(row.name);
    setStatus(row.status);
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(`Apakah yakin ingin menghapus data "${row.name}"?`);
    if (!confirmDelete) return;
    try {
      const response = await deletedepartment(row.uuid, accessToken);
      toast.success(response.message || "Data berhasil dihapus");
      handleGetDepartmentAll();
    } catch (error) {
      toast.error("Gagal menghapus data");
      console.error(error);
    }
  };

  const columns = [
    {
      name: "No",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    { name: "Nama", selector: (row) => row.name, sortable: true },
    {
      name: "Status",
      selector: (row) => String(row.status) === "1" ? "Aktif" : "Tidak Aktif",
      sortable: true,
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

  const handleGetDepartmentAll = async () => {
    try {
      const response = await getdepartmentall(accessToken);
      setDataDepartment(response.data);
    } catch (err) {
      console.error("Polling DB gagal:", err);
    }
  };

  useEffect(() => {
    handleGetDepartmentAll();
  }, []);

  useEffect(() => {
    let filtered = datadepartment;
    if (searchText) {
      filtered = filtered.filter((item) =>
        Object.values({
          ...item,
          status: String(item.status) === "1" ? "Aktif" : "Tidak Aktif"
        }).some((val) =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    setFilteredData(filtered);
  }, [searchText, datadepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    const data = {
      uuid: uuid || "",
      name,
      status: status,
    };

    try {
      let response;
      if (uuid) {
        response = await updatedepartment(data, accessToken);
      } else {
        response = await postdepartment(data, accessToken);
      }

      if (response.error) {
        setLoading(false);
        toast.error(response.error);
      } else {
        setLoading(false);
        setName("");
        setStatus("");
        setUuid("");
        toast.success(response.message || "Data berhasil disimpan");
        setModalOpen(false);
        handleReset();
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Terjadi kesalahan saat menyimpan data.");
        console.error(error);
      }
    }
  };

  const handleReset = () => {
    setDataDepartment([]);
    setFilteredData([]);
    setSearchText("");
    handleGetDepartmentAll();
  };

  return (
    <Container className="my-3 bg-white rounded shadow p-4">

      <Row className="align-items-center mb-3">
        <Col xs="10" md="6" className="d-flex align-items-center">
          <h4 className="fw-bold text-dark mb-0">List Master Department</h4>
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

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" modalClassName="custom-modal">
        <ModalHeader toggle={toggleModal}>Data Department ( Entri / Edit )</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Row className="align-items-center">
                    <Col md={4}><label htmlFor="uuid" className="form-label mb-0">ID:</label></Col>
                    <Col md={8}>
                      <Input
                        type="text"
                        value={uuid}
                        readOnly
                        onChange={(e) => setUuid(e.target.value)}
                        id="uuid"
                      />
                    </Col>
                  </Row>
                </div>

                <div className="mb-3">
                  <Row className="align-items-center">
                    <Col md={4}><label htmlFor="name" className="form-label mb-0">Nama Departemen:</label></Col>
                    <Col md={8}>
                      <Input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                      />
                    </Col>
                  </Row>
                </div>

                <div className="mb-3">
                  <Row className="align-items-center">
                    <Col md={4}><label htmlFor="status" className="form-label mb-0">Status Departemen:</label></Col>
                    <Col md={8}>
                      <Input
                        type="select"
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                        id="status">
                        <option value="">-- PILIH --</option>
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                      </Input>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <div className="text-end">
              {loading ? (
                <Button type="submit" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Please wait...
                </Button>
              ) : (
                <Button color="primary" className="px-3 py-1" style={{ fontSize: "14px", borderRadius: "6px" }}>
                  SIMPAN
                </Button>
              )}
            </div>
          </form>
        </ModalBody>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default MasterDepartment;
