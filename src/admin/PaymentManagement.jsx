import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentManagement = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment/getAllCheckouts');
        setCheckouts(response.data.checkouts);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thanh toán:', error);
      }
    };

    fetchCheckouts();
  }, []);

  return (
    <div className="container mt-">
      <h6 className="text-center mb-4">Quản lý Thanh Toán</h6>

      {checkouts.length === 0 ? (
        <p className="text-center">Chưa có đơn hàng nào</p>
      ) : (
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">Mã Đơn Hàng</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Ngày Thanh Toán</th>
              <th scope="col">Tổng Tiền</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Hình Ảnh Sản Phẩm</th>
              
            </tr>
          </thead>
          <tbody>
  {checkouts.map((checkout) => (
    <tr key={checkout.orderId}>
      <td>{checkout.orderId}</td>
      <td>
        <span className={`badge ${checkout.status === "completed" ? "bg-success" : "bg-warning"}`}>
          {checkout.status === "completed" ? "Hoàn Thành" : "Đang Xử Lý"}
        </span>
      </td>
      <td>{checkout.date_checkout ? new Date(checkout.date_checkout).toLocaleString() : "Không có dữ liệu"}</td>
      <td>{checkout.totalAmount.toLocaleString()} VND</td> {/*  Thay checkout.amount bằng checkout.totalAmount */}
      
      {/* Hiển thị tổng số lượng sản phẩm trong đơn hàng */}
      <td>{checkout.products.reduce((sum, item) => sum + item.quantity, 0)}</td> 

      <td>
        {/* Hiển thị hình ảnh sản phẩm đầu tiên */}
        {checkout.products.length > 0 ? (
          <img
            src={checkout.products[0].mainImage} //  Truy cập trực tiếp mainImage
            alt={checkout.products[0].title}
            className="img-fluid"
            style={{ maxWidth: "80px", objectFit: "cover" }}
          />
        ) : (
          "Không có hình ảnh"
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default PaymentManagement;
