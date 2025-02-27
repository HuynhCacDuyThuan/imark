import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "../css/voucher.css"; 
const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
     
      navigate("/login");
    } else {
      
      setUserId(storedUserId);
      fetchVouchers(); 
    }
  }, [navigate]);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vouchers");
      setVouchers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
    }
  };

  const handleApplyVoucher = async (voucherId) => {
    try {
      // Send the request to apply the voucher
      const response = await axios.post("http://localhost:5000/api/useVouchers/applyVoucher", {
        userId,
        voucherId,
      });

    
      alert(response.data.message);
      fetchVouchers(); 
    } catch (error) {
      console.error("Lỗi khi áp dụng voucher:", error);
      alert("Có lỗi xảy ra khi áp dụng voucher.");
    }
  };

  return (
    <div className="container mt-2 mb-2">
      <div className="row">
        {vouchers.slice(0, 3).map((voucher, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-lg border-0 voucher-card">
              <div className="card-body text-center">
           
                <h5 className="card-title">
                  <i className="bi bi-gift-fill text-danger me-2"></i>
                  {voucher.name}
                </h5>

               
                <p className="card-text">
                  <i className="bi bi-cash-coin text-success"></i> Giảm ngay{" "}
                  <strong>{voucher.discountAmount.toLocaleString()} VND</strong> - Đơn từ{" "}
                  <strong>{voucher.minOrderValue.toLocaleString()} VND</strong>
                </p>

                <p className="text-start w-100 m-0">
                  <i className="bi bi-tags-fill"></i> <strong>Danh mục:</strong> {voucher.category?.name}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-primary">
                    <i className="bi bi-ticket-perforated"></i> Số lượng: {voucher.quantity}
                  </span>
                  <span className="text-danger">
                    <i className="bi bi-calendar3"></i> HSD: {new Date(voucher.expiryDate).toLocaleDateString()}
                  </span>
                </div>

               
                <button
                  className="btn btn-danger w-100 mt-3"
                  onClick={() => handleApplyVoucher(voucher._id)} // Apply voucher on button click
                  disabled={voucher.quantity <= 0} // Disable button if voucher quantity is 0
                >
                  <i className="bi bi-hand-thumbs-up-fill"></i> Lấy ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voucher;
