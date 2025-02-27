import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect } from "react";
import "../css/AdminHeader.css"
const AdminHeader = () => {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
   
    localStorage.removeItem("userId"); // Xóa userId
    localStorage.removeItem("token");  // Xóa token
    navigate("/"); // Chuyển hướng về trang đăng nhập
    
  };

  
  

  return (
    <header className="bg-dark text-white p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="d-flex align-items-center">
         
        <Link to="/admin" className="admin-link">
      <h4 className="mb-0">Quản Lý Admin</h4>
    </Link>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex align-items-center">
          {/* User Profile */}
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>Admin
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             
              <li>
              <Link to="/" className="dropdown-item" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
      </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
