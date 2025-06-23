import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody
} from "reactstrap";
import Select from "react-select";

import {
  getuserall, postuser, updateuser, deleteuser
} from "../services/MasterUser";
import { getpegawaiall } from "../services/MasterPegawai";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MasterUser = () => {
  const accessToken = localStorage.getItem("token");
  const [datapegawai, setDataPegawai] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [per_page, setPerPage] = useState(10);

  // Form State
  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [uuid_pegawai, setPegawai] = useState("");

  const [pegawaiOptions, setPegawaiOptions] = useState([]);

  const toggleModal = () => {
    setUuid("");
    setName("");
    setPassword("");
    setRole("");
    setPegawai("");
    setModalOpen(!modalOpen);
  };

  const columns = [
    { name: "No", cell: (row, index) => index + 1, width: "60px" },
    {
      name: "Nama Pegawai",
      selector: (row) => row.pegawai?.employee_name || "-", sortable: true,
    },
    { name: "Username", selector: (row) => row.name, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
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
    setName(row.name);
    setRole(row.role);
    // setPassword(""); // kosongkan saat edit
    setPassword(row.password);
    setPegawai(row.uuid_employee);
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Yakin ingin menghapus ${row.name}?`)) return;
    try {
      await deleteuser(row.uuid, accessToken);
      toast.success("Data berhasil dihapus");
      handlegetuserall();
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !role || !uuid_pegawai || (!uuid && !password)) {
      toast.error("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    const data = {
      uuid: uuid || "",
      uuid_employee: uuid_pegawai,
      name,
      role,
      ...(password && { password }),
    };

    try {
      const response = uuid
        ? await updateuser(data, accessToken)
        : await postuser(data, accessToken);

      toast.success(response.message || "Data berhasil disimpan");
      toggleModal();
      handlegetuserall();
    } catch (err) {
      toast.error("Gagal menyimpan data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlegetuserall = async () => {
    try {
      const res = await getuserall(accessToken);
      setDataPegawai(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data user");
    }
  };

  const fetchPegawaiDropdown = async () => {
    try {
      const pegawai = await getpegawaiall(accessToken);
      setPegawaiOptions(pegawai.data.map(d => ({ value: d.uuid, label: d.employee_name })));
    } catch (err) {
      toast.error("Gagal mengambil data pegawai");
    }
  };

  useEffect(() => {
    handlegetuserall();
    fetchPegawaiDropdown();
  }, []);

  useEffect(() => {
    const filtered = datapegawai.filter(item => {
      const statusText = item.status === "1" ? "Aktif" : "Tidak Aktif";
      const pegawaiName = item.pegawai?.employee_name || "";

      const combinedString = `
        ${item.name || ""}
        ${item.role || ""}
        ${statusText}
        ${pegawaiName}
      `.toLowerCase();

      return combinedString.includes(searchText.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchText, datapegawai]);

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#800000",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        border: "1px solid #ccc",
      },
    },
    cells: {
      style: {
        border: "1px solid #ccc",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #ccc",
      },
    },
  };

  return (
    <Container className="my-3 bg-white rounded shadow p-4">
      <Row className="align-items-center mb-3">
        <Col xs="10" md="6" className="d-flex align-items-center">
          <h4 className="fw-bold text-dark mb-0">List Master User</h4>
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

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Form User</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>

        {!uuid && (
            <Row className="mb-3">
              <Col md={4}><label>Pegawai</label></Col>
              <Col md={8}>
                <Select
                  options={pegawaiOptions}
                  value={pegawaiOptions.find(opt => opt.value === uuid_pegawai)}
                  onChange={(e) => setPegawai(e?.value || "")}
                  isClearable
                  placeholder="Pilih Pegawai"
                />
              </Col>
            </Row>
        )}

            <Row className="mb-3">
              <Col md={4}><label>Username</label></Col>
              <Col md={8}>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}><label>Role</label></Col>
              <Col md={8}>
                <Input type="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">-- PILIH ROLE --</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </Input>
              </Col>
            </Row>

              <Row className="mb-3">
                <Col md={4}><label>Password</label></Col>
                <Col md={8}>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

export default MasterUser;
