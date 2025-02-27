import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/profile.css'; // Custom CSS

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      // Gọi API lấy danh sách đơn hàng của người dùng
      const response = await axios.get(`http://localhost:5000/api/payment/getUserCheckouts/${userId}`);
      setOrders(response.data.checkouts); // Cập nhật state với dữ liệu đơn hàng
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  return (
    <div className="container ">
      <h4 className="mb-4">Danh sách đơn hàng</h4>

      {orders.length === 0 ? (
        <div className="no-results text-center">
          <img
            src="https://winmart.vn/_next/static/images/no-product-c2f7be08e62593a82bc819708625486b.png"
            alt="No results"
            className="no-results-img"
          />
          <p>Không tìm thấy kết quả</p>
        </div>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th scope="col">Mã Đơn</th>
              <th scope="col">Ngày Mua</th>
              <th scope="col">Tổng Tiền</th>
              <th scope="col">Tình Trạng</th>
             
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
  <tr key={index}>
    <td>{order.orderId}</td>
    <td>{order.date_checkout ? new Date(order.date_checkout).toLocaleDateString() : "Không có dữ liệu"}</td>

    <td>{order.totalAmount.toLocaleString()} VND</td> {/*  Thay order.amount bằng order.totalAmount */}
    
    <td>
      <span className={`badge ${order.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
        {order.status === 'completed' ? 'Hoàn Thành' : 'Đang Xử Lý'}
      </span>
    </td>

   
  </tr>
))}

          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
