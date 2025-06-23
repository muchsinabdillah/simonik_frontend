import React, { useState, useEffect } from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { Outlet, Link } from "react-router-dom";
import { BASE_URL_SIMONIK } from "../helpers/config"; // pastikan path ini benar


const NavbarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
const [userName, setUserName] = useState("Loading...");

const toggleNavbar = () => setIsOpen(!isOpen);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const fetchUserName = async () => {
    try {
      const resUser = await fetch(`${BASE_URL_SIMONIK}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await resUser.json();

      if (user?.uuid_employee) {
        const resPegawai = await fetch(`${BASE_URL_SIMONIK}/masterdata/pegawai/show/id/${user.uuid_employee}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pegawai = await resPegawai.json();
        setUserName(pegawai?.data?.employee_name || "User");
      } else {
        setUserName("User");
      }
    } catch (err) {
      console.error("Gagal mengambil nama user:", err);
      setUserName("User");
    }
  };

  fetchUserName();
}, []);


  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar expand="md" dark className="px-3 py-2" style={{ backgroundColor: '#8B0A0A' }}>
    
        <NavbarBrand tag={Link} to="/simonik/home"> 
          <img
            src="/simonik-logo.jpeg"
            alt="Simonik Logo"
            height="50"
            style={{ width: 'auto' }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
              {/* Menu MASTER DATA dan LAPORAN pakai Dropdown */}
              {['MASTER DATA', 'LAPORAN'].map((item) => (
                <UncontrolledDropdown nav inNavbar key={item}>
                  <DropdownToggle nav caret className="text-white">
                    {item}
                  </DropdownToggle>
                  <DropdownMenu>
                    {item === 'LAPORAN' && (
                      <>
                        {/* <DropdownItem tag={Link} to="/simonik/laporan/bulanan">Laporan Bulanan</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/laporan/tahunan">Rekap Tahunan</DropdownItem> */}
                        <DropdownItem tag={Link} to="/simonik/laporan/grafik">Graphic Bulanan</DropdownItem>
                      </>
                    )}
                    {item === 'MASTER DATA' && (
                      <>
                        <DropdownItem tag={Link} to="/simonik/master/monitoring/detail">Master Detail Monitoring</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/monitoring/jenis">Master Jenis Monitoring</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/user">Master User</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/pegawai">Master Pegawai</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/profesi">Master Profesi</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/unit">Master Unit</DropdownItem>
                        <DropdownItem tag={Link} to="/simonik/master/department">Master Departement</DropdownItem>
                      </>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              ))}

              {/* MONITORING ke menu icon */}
             <NavItem>
              <Link to="/simonik/monitoring" className="nav-link text-white">MONITORING</Link>
            </NavItem>

            </Nav>


          <Nav className="ms-auto" navbar>
            {/* Gabungan avatar + nama + dropdown profile */}
            <UncontrolledDropdown nav inNavbar className="ms-md-auto">
              <DropdownToggle
                nav
                caret
                className="d-flex align-items-center gap-2 text-white nav-link"
              >
                <img
                  src="/avatar.png"
                  alt="Profile"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white'
                  }}
                />
                <span className="d-none d-md-inline">{userName}</span>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} to="/simonik/akun">
                  <i className="bi bi-person me-2" /> Account
                </DropdownItem>
                <DropdownItem tag={Link} to="/simonik/ganti-password">
                  <i className="bi bi-key me-2" /> Ganti Password
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => {
                  localStorage.removeItem("token"); // Hapus token
                  window.location.href = "/simonik/login"; // Redirect manual
                  }}>
                  <i className="bi bi-box-arrow-right me-2" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Collapse>
      </Navbar>

      {/* Konten halaman */}
      <div className="flex-grow-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default NavbarLayout;
