import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(""); // "add" | "edit"
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    discountAmount: "",
    minOrderValue: "",
    category: "",
    expiryDate: "",
    quantity: 100,
  });

  useEffect(() => {
    fetchVouchers();
    fetchCategories();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vouchers");
      setVouchers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const handleUseVoucher = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/vouchers/use/${id}`);
      fetchVouchers();
      alert("Đã sử dụng voucher!");
    } catch (error) {
      console.error("Lỗi khi sử dụng voucher:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (modalType === "add") {
        await axios.post("http://localhost:5000/api/vouchers/add", newVoucher);
      } else {
        await axios.put(`http://localhost:5000/api/vouchers/update/${selectedVoucher._id}`, newVoucher);
      }
      fetchVouchers();
      setNewVoucher({ name: "", discountAmount: "", minOrderValue: "", category: "", expiryDate: "", quantity: 100 });
      setSelectedVoucher(null);
      document.getElementById("voucherModalClose").click(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật voucher:", error);
    }
  };

  const handleEdit = (voucher) => {
    setModalType("edit");
    setSelectedVoucher(voucher);
    setNewVoucher({ ...voucher });
    document.getElementById("openVoucherModal").click();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/vouchers/${id}`);
        fetchVouchers();
      } catch (error) {
        console.error("Lỗi khi xóa voucher:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-center">Quản lý Khuyến Mãi</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setModalType("add");
          setNewVoucher({ name: "", discountAmount: "", minOrderValue: "", category: "", expiryDate: "", quantity: 100 });
          document.getElementById("openVoucherModal").click();
        }}
      >
        <FaPlus /> Thêm Voucher
      </button>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tên</th>
            <th>Giảm</th>
            <th>Đơn tối thiểu</th>
            <th>Danh mục</th>
            <th>Hạn</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.discountAmount} VND</td>
              <td>{v.minOrderValue} VND</td>
              <td>{v.category?.name}</td>
              <td>{new Date(v.expiryDate).toLocaleDateString()}</td>
              <td>{v.quantity}</td>
              <td>
                
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(v)}>
                  <FaEdit /> Sửa
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(v._id)}>
                  <FaTrash /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Thêm/Sửa Voucher */}
      <button id="openVoucherModal" className="d-none" data-bs-toggle="modal" data-bs-target="#voucherModal"></button>
      <div className="modal fade" id="voucherModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content voucher">
            <div className="modal-header ">
              <h5 className="modal-title">{modalType === "add" ? "Thêm Voucher" : "Chỉnh sửa Voucher"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="voucherModalClose"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-2" placeholder="Tên voucher" value={newVoucher.name} onChange={(e) => setNewVoucher({ ...newVoucher, name: e.target.value })} />
              <input type="number" className="form-control mb-2" placeholder="Giảm giá (VND)" value={newVoucher.discountAmount} onChange={(e) => setNewVoucher({ ...newVoucher, discountAmount: e.target.value })} />
              <input type="number" className="form-control mb-2" placeholder="Đơn tối thiểu (VND)" value={newVoucher.minOrderValue} onChange={(e) => setNewVoucher({ ...newVoucher, minOrderValue: e.target.value })} />
              <select className="form-select mb-2" value={newVoucher.category} onChange={(e) => setNewVoucher({ ...newVoucher, category: e.target.value })}>
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input type="date" className="form-control mb-2" value={newVoucher.expiryDate} onChange={(e) => setNewVoucher({ ...newVoucher, expiryDate: e.target.value })} />
              <input type="number" className="form-control mb-2" placeholder="Số lượng" value={newVoucher.quantity} onChange={(e) => setNewVoucher({ ...newVoucher, quantity: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Hủy
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddOrUpdate}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherManagement;
