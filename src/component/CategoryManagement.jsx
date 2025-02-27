import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/categories/categories"; 

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };


  const handleAdd = async () => {
    if (newCategory.trim() === "") {
      alert("Tên danh mục không được để trống!");
      return;
    }

    try {
      const response = await axios.post(API_URL, { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Không thể thêm danh mục. Danh mục có thể đã tồn tại!");
    }
  };

  
  const handleUpdate = async (id) => {
    if (updatedName.trim() === "") {
      alert("Tên danh mục không được để trống!");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${id}`, { name: updatedName });
      setCategories(categories.map((category) => (category._id === id ? response.data.category : category)));
      setEditingCategory(null);
      setUpdatedName("");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      alert("Không thể cập nhật danh mục!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      alert("Không thể xóa danh mục!");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center text-primary"> Quản lý danh mục</h2>

      {/* Form thêm danh mục */}
      <div className="card shadow p-3 mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên danh mục mới"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAdd}>
            <FaPlus /> Thêm danh mục
          </button>
        </div>
      </div>

      {/* Bảng danh mục */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "50%" }}>Tên danh mục</th>
              <th style={{ width: "30%" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="align-middle text-center">
                  <td>{category._id}</td>
                  <td>
                    {editingCategory === category._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="d-flex align-items-center gap-2 justify-content-center">
                    {editingCategory === category._id ? (
                      <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(category._id)}>
                        Lưu
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setEditingCategory(category._id);
                          setUpdatedName(category.name);
                        }}
                      >
                        <FaEdit /> Sửa
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category._id)}>
                      <FaTrash /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  Không có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
