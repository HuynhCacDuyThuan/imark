import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); //  Sử dụng useNavigate()
  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.put(`http://localhost:5000/api/products/delete/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center text-primary">Quản lý sản phẩm</h2>

      {/* Nút Thêm sản phẩm */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate("/add-product")}>
          <FaPlus /> Thêm sản phẩm
        </button>
      </div>

      {/* Bảng sản phẩm */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Giảm giá (%)</th>
              <th>Số lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="align-middle text-center">
                  <td>{product._id}</td>
                  <td>{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</td>

                  <td>{product.price.toLocaleString()} VND</td>
                  <td>{product.discount} %</td>
                  <td>{product.quantity}</td>
                  <td>
                  <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => navigate(`/edit-product/${product._id}`)}
>
  <FaEdit /> Sửa
</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
