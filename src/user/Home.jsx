import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; //  Import Redux action
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/home.css";
import Header from "../component/Header";
import Banner from "../component/Banner";
import Voucher from "../component/Voucher";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

  //  Dispatch Redux action để thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ userId, product })); //  Gửi Redux action
  };
  


  return (
    <div className="container-fluid">
      <Header />
      <Banner />
      <Voucher />

      <div className="container">
        {Object.keys(groupedProducts).map((categoryName) => (
          <div key={categoryName}>
            <div className="row iOtYzK">
              <div className="col-12 mb-4 d-flex align-items-center">
                <i className="bi bi-tags-fill text-danger me-2"></i>
                <h2 className="header-title">{categoryName}</h2>
              </div>
            </div>

    
            {Array.isArray(groupedProducts[categoryName]) ? (
              <div className="row mt-5">
                {groupedProducts[categoryName].map((product, index) => (
                  <div className="col-md-3 col-sm-3 mb-4" key={index}>
                    <div className="product-card">
                      <img
                        src={product.mainImage}
                        alt={product.title}
                        className="product-image"
                      />
                      <h5 className="text-truncate" onClick={() => handleProductClick(product._id)}>
                        <i className="bi bi-box-seam text-primary me-2"></i>
                        {product.title}
                      </h5>
                      <p>
                        <i className="bi bi-cash-coin text-success me-2"></i>
                        Giá: <strong>{product.price.toLocaleString()} VND</strong>
                      </p>
                      {product.discount > 0 && (
                        <p className="text-danger">
                          <i className="bi bi-percent me-2"></i>
                          Giảm: {product.discount}%
                        </p>
                      )}
                      <button className="btn btn-danger" onClick={() => handleAddToCart(product)}>
                        <i className="bi bi-cart-check-fill me-2"></i> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">Không có sản phẩm nào trong danh mục này.</p>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
