import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Lấy id từ URL
import AdminHeader from "../component/AdminHeader";
import CategoryManagement from "../component/CategoryManagement";
import ProductManager from "./ProductManager";
import VoucherManagement from "./VoucherManagement";
import UserManagement from "./UserManagement";
import PaymentManagement from "./PaymentManagement";
import Statistics from "./Statistics";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("models"); // Mặc định là "Thống kê"

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar (Left Side) */}
          <div className="col-md-3 bg-light p-4">
            <h4 className="text-center mb-4">Quản Lý Admin</h4>
            <div className="list-group">
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("models")}>
                Thống kê
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("users")}>
                Quản lý người dùng
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("posts")}>
                Quản lý đơn hàng
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("banners")}>
                Quản lý sản phẩm
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("orders")}>
                Quản lý mã khuyến mãi
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => toggleSection("categories")}>
  Quản lý danh mục
</button>

            </div>
          </div>

          {/* Content Area (Right Side) */}
          <div className="col-md-9 p-4">
            <div className="row">
              {/* Thống kê Section */}
              {activeSection === "models" && (
                <div className="col-md-12 mb-3">
               <Statistics/>
                </div>
              )}

              {/* Quản lý người dùng Section */}
              {activeSection === "users" && (
                <div className="col-md-12 mb-3">
               <UserManagement/>
                </div>
              )}

              {/* Quản lý đơn hàng Section */}
              {activeSection === "posts" && (
                <div className="col-md-12 mb-3">
                <PaymentManagement/>
                </div>
              )}

              {/* Quản lý sản phẩm Section */}
              {activeSection === "banners" && (
                <div className="col-md-12 mb-3">
                <ProductManager></ProductManager>
                </div>
              )}

              {/* Quản lý mã khuyến mãi Section */}
              {activeSection === "orders" && (
                <div className="col-md-12 mb-3">
                <VoucherManagement/>
                </div>
              )}
              {activeSection === "categories" && (
                <div className="col-md-12 mb-3">
                <CategoryManagement/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;