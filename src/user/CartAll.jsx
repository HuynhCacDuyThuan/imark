import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { fetchCart, updateCartQuantity, removeCartItem, updateTotalAmount } from "../redux/cartSlice"; //  Redux Actions
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Modal from react-bootstrap

const CartAll = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalAmount } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [userVouchers, setUserVouchers] = useState([]); // State to store vouchers

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      console.log(cartItems)
    }
  }, [userId, dispatch]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
       
        return;
      }

      if (!cartItems.length) {
      
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.post('http://localhost:5000/api/payment/add', { userId }, { headers });

      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert('Unable to process payment. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An error occurred during payment.');
    }
  };

  const handleVoucherButtonClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/useVouchers/getUserVouchers/${userId}`);
      setUserVouchers(response.data.vouchers); // Update the state with the fetched vouchers
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
      alert("Không thể lấy danh sách mã giảm giá.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleApplyVoucher = async (voucherId) => {
    try {
      let totalAmountAfterDiscount = totalAmount; // Start with the original total amount
      let voucherApplied = false; // Flag to check if the voucher was applied
  
      // Loop through cart items
      for (let item of cartItems) {
        const productId = item.productId;
        console.log("ProductId:", productId);
  
        // Call your API to get the categoryId for the product based on its productId
        const response = await axios.get(`http://localhost:5000/api/products/categoryByProduct/${productId}`);
        const categoryId = response.data.categoryId._id;  // Get just the _id
        console.log("Product's Category ID:", categoryId);
  
        // Loop through user vouchers
        for (let userVoucher of userVouchers) {
          // Log userVoucher details for debugging
          console.log("userVoucher:", userVoucher);
          console.log("Voucher categoryId:", userVoucher.category.categoryId);
          console.log("Voucher minOrderValue:", userVoucher.minOrderValue);  // Access directly
  
          // Check if the category matches
          if (userVoucher.category.categoryId === categoryId) {
            console.log("Voucher applied: ", userVoucher.voucherName);
  
            // Check if the totalAmount meets the minOrderValue of the voucher
            console.log("Total Amount:", totalAmount);
            console.log("Voucher Min Order Value:", userVoucher.minOrderValue);
  
            // Ensure the voucher has minOrderValue and the totalAmount meets the condition
            if (userVoucher.minOrderValue && totalAmount >= userVoucher.minOrderValue) {
              // Apply the discount
              totalAmountAfterDiscount -= userVoucher.discountAmount;
              voucherApplied = true;
              console.log("Voucher applied successfully. New total amount:", totalAmountAfterDiscount);
              break; // Exit loop once voucher is applied
            } else {
              console.log("Total amount does not meet the minimum order value.");
            }
          } else {
            console.log("Category ID does not match.");
          }
        }
  
        if (voucherApplied) break; 
      }
  
    
      if (voucherApplied) {
        console.log("New Total Amount after discount:", totalAmountAfterDiscount);
  
       
        await axios.put(`http://localhost:5000/api/cart/updateTotalAmount/${userId}`, { totalAmount: totalAmountAfterDiscount });
  
      
        dispatch(updateTotalAmount(totalAmountAfterDiscount)); 
  
     
        await axios.delete(`http://localhost:5000/api/useVouchers/deleteVoucher`, {
          data: { userId, voucherId }
        });
  
        console.log("Voucher deleted after being applied.");
      } else {
        alert("Voucher could not be applied. Make sure the category matches and the order meets the minimum value.");
      }
  
      // Close the modal after applying the voucher
      setShowModal(false);
    } catch (error) {
      console.error("Error applying voucher:", error);
      alert("There was an error applying the voucher.");
    }
  };
  
  
  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <div className="row mt-2">
          {/* Cart Details - 9 Column */}
          <div className="col-md-9">
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted">Giỏ hàng của bạn đang trống!</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="cart-item d-flex justify-content-between align-items-center p-3 border rounded shadow-sm"
                  >
                    {/* Product Info */}
                    <div className="item-info d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-img"
                        style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "15px" }}
                      />
                      <div className="item-text">
                        <p className="mb-1 fw-bold">{item.title}</p>
                        <p className="fw-semibold text-danger">{item.price.toLocaleString()} VND</p>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove Button */}
                    <div className="item-actions d-flex align-items-center">
                      <div className="quantity-control d-flex align-items-center border rounded p-1">
                        <FaMinus
                          onClick={() => dispatch(updateCartQuantity({ userId, productId: item.productId, action: "decrease" }))}
                          className="cursor-pointer"
                        />
                        <span className="quantity mx-2">{item.quantity}</span>
                        <FaPlus
                          onClick={() => dispatch(updateCartQuantity({ userId, productId: item.productId, action: "increase" }))}
                          className="cursor-pointer"
                        />
                      </div>

                      <button
  className="btn btn-outline-danger btn-sm ms-3"
  onClick={async () => {
    await dispatch(removeCartItem({ userId, productId: item.productId }));
    window.location.reload(); 
  }}
>
  <FaTrash />
</button>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Summary - 3 Column */}
          <div className="col-md-3">
            <div className="cart-summary p-4 border rounded shadow-sm">
              <div className="summary-item mb-3">
                <span className="fw-bold">Tạm tính giỏ hàng:</span>
                <span className="fw-bold">{totalAmount.toLocaleString()} VND</span>
              </div>
              <div className="summary-item mb-3">
                <span className="fw-bold">Phí vận chuyển:</span>
                <span className="text-success">Miễn phí giao hàng</span>
              </div>
              <button className="btn btn-danger w-100 mb-3" onClick={handleVoucherButtonClick}>
                Mã Giảm Giá
              </button>
              <button className="btn btn-primary w-100" onClick={handlePayment}>
                Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Voucher Modal */}
      <Modal className="voucher1" show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Danh sách Mã Giảm Giá</Modal.Title>
      </Modal.Header>

      <Modal.Body className="voucher1">
      {userVouchers.length === 0 ? (
  <p className="text-center">Chưa có mã giảm giá nào.</p>
) : (
  userVouchers.map((voucher, index) => (
    <div key={index} className="voucher-item d-flex justify-content-between align-items-center mb-3">
      <div className="voucher-details d-flex flex-column">
        <h6>{voucher.voucherName}</h6>
        <p>Giảm giá: {voucher.discountAmount.toLocaleString()} VND</p>
        <p>HSD: {new Date(voucher.expiryDate).toLocaleDateString()}</p>

        {/* Display category information */}
        {voucher.category && (
          <p>
            <strong>Danh mục:</strong> {voucher.category.categoryName}
          </p>
        )}
      </div>

  
      <Button
        variant="primary"
        onClick={() => handleApplyVoucher(voucher.voucherId)}
        className="apply-btn"
      >
        Áp Dụng
      </Button>
    </div>
  ))
)}

      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleCloseModal} className="w-45">
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default CartAll;
