import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import io from "socket.io-client";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, listenForCartUpdates } from "../redux/cartSlice";


const socket = io("http://localhost:5000");

function Header() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái hiển thị dropdown

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories/categories"); // API lấy danh mục
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  // Xử lý tìm kiếm khi người dùng nhấn Enter hoặc click vào icon
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/search?title=${encodeURIComponent(searchQuery)}`);
      }
    }
  };
  
  const dispatch = useDispatch();
  const { items: cartItems, cartCount } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(listenForCartUpdates(userId));
    }
  }, [userId, dispatch]);
 
  const handleCartClick = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      navigate("/login");
      return;
    }
    setShowCartDetails(!showCartDetails);
  };

  return (
    <header className="header">
      <div className="bg-danger text-white py-2 px-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-6 col-md-2 d-flex align-items-center">
            <Link to="/" class="imark-logo">
  iMark
</Link>

            </div>

            {/* Toggle Menu Button */}
            <div className="col-6 d-md-none d-flex justify-content-end">
              <button className="btn text-white" onClick={() => setMenuOpen(!menuOpen)}>
                <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} style={{ fontSize: "24px" }}></i>
              </button>
            </div>

            {/* Navigation */}
            <div className={`col-12 col-md-10 d-md-flex align-items-center justify-content-between ${menuOpen ? "d-block" : "d-none d-md-flex"}`}>
              {/* Search Bar */}
              <div className="col-12 col-md-6 d-flex justify-content-center mt-2 mt-md-0">
                <div className="input-group" style={{ maxWidth: "500px", width: "100%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch} // Nhấn Enter để tìm kiếm
                  style={{
                    borderRadius: "25px",
                    paddingLeft: "40px",
                    border: "1px solid #ddd",
                  }}
                />
                  <span className="position-absolute" style={{ left: "10px", top: "50%", transform: "translateY(-50%)" }}>
                    <i className="fas fa-search" style={{ color: "#999" }}></i>
                  </span>
                </div>
              </div>

              {/* Cart, Profile, Location */}
              <div className="col-12 col-md-4 d-flex flex-column flex-md-row align-items-center mt-2 mt-md-0">
                {/* Cart */}
                <div className="cart text-white me-3 d-flex align-items-center position-relative" onClick={handleCartClick} style={{ cursor: "pointer" }}>
                  <FaShoppingCart className="me-2" />
                  <span>Giỏ hàng ({cartCount})</span>

                  {/* Cart Details */}
                  {showCartDetails && (
                    <div className="cart-details position-absolute bg-white p-4 mt-2 rounded shadow-lg">
                      {cartItems.length === 0 ? (
                        <p className="text-muted">Giỏ hàng của bạn hiện tại trống.</p>
                      ) : (
                        <div>
                          <ul className="list-unstyled">
                            {cartItems.map((item, index) => (
                              <li key={index} className="cart-item d-flex align-items-center mb-3">
                                <img
                                  src={item.image  }
                                  alt={item.title}
                                  className="cart-item-img"
                                  style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "15px" }}
                                />
                                <div>
                                  <p className="mb-1">{item.title}</p>
                                  <p className="text-muted mb-1">{item.price.toLocaleString()} VND</p>
                                  <p className="text-muted">x{item.quantity}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <button
  className="btn btn-danger w-100 mt-3 py-2 rounded"
  onClick={() => navigate("/cart")} 
>
  Xem chi tiết
</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div
  className="profile"
  onClick={() => {
    if (!userId) {
      navigate("/login"); 
    } else {
      navigate("/profile"); 
    }
  }}
  style={{ cursor: "pointer" }} 
>
  <i className="fas fa-user-circle" style={{ fontSize: "24px" }}></i>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-light d-flex justify-content-between align-items-center py-2 px-4 position-relative">
        {/* Categories */}
        <div className="d-flex align-items-center position-relative">
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaBars className="me-2" />
            <span>Danh mục</span>
          </div>

          {/* Dropdown Category List */}
          {showDropdown && (
            <div className="category-dropdown position-absolute bg-white shadow p-3 rounded" style={{ top: "40px", left: "0", minWidth: "200px", zIndex: "10" }}>
              {categories.length === 0 ? (
                <p className="text-muted text-center">Không có danh mục nào</p>
              ) : (
                <ul className="list-unstyled mb-0">
                  {categories.map((category) => (
                    <li key={category._id} className="py-2">
                      <Link to={`/category/${category._id}`} className="text-dark text-decoration-none">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Hotline */}
        <div className="d-flex align-items-center">
          <FaPhoneAlt className="me-2" />
          <span>Tư vấn mua hàng</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
