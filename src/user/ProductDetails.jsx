import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useDispatch } from "react-redux";
import { addToCart, addToCart1 } from "../redux/cartSlice";

const ProductDetails = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]); 


  const handleAddToCart = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
  
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Vui lòng chọn số lượng hợp lệ!");
      return;
    }
  
    dispatch(addToCart1({ userId, product, quantity })); 
  };
  

  if (!product) return <p className="text-center mt-5">Đang tải sản phẩm...</p>;

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <div className="row">
          {/* Hình ảnh sản phẩm */}
          <div className="col-md-5">
            <img
              src={product.mainImage}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "320px", objectFit: "contain" }}
            />
            <div className="d-flex mt-2">
              {product.subtitles && product.subtitles.length > 0 ? (
                product.subtitles.map((sub, index) => (
                  <img
                    key={index}
                    src={sub.image}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-thumbnail me-2"
                    style={{ width: "70px", height: "70px" }}
                  />
                ))
              ) : (
                <p className="text-muted"></p>
              )}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-7">
            <h2>{product.title}</h2>

            <h4 className="text-danger">
            {(product.price - (product.price * product.discount / 100)).toLocaleString()}₫
              {product.discount > 0 && (
                <small className="text-muted text-decoration-line-through ms-2">
                  {(product.price ).toLocaleString()}₫
                </small>
              )}
            </h4>

            <p>
              <strong>Tình trạng:</strong>{" "}
              <span className={product.quantity > 0 ? "text-success" : "text-danger"}>
                {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
            </p>

            {product.promotion && (
              <>
                <p>
                  <strong>Vận chuyển:</strong>{" "}
                  <span dangerouslySetInnerHTML={{ __html: product.promotion.freeShippingThreshold }}></span>
                </p>
                <p className="bg-light p-2">
                  <strong>Khuyến mại:</strong>{" "}
                  <span dangerouslySetInnerHTML={{ __html: product.promotion.description }}></span>
                </p>
              </>
            )}

            {/* Chọn số lượng */}
            <div className="d-flex align-items-center">
              <strong className="me-3">Số lượng:</strong>
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="text"
                className="form-control text-center mx-2"
                value={quantity}
                style={{ width: "50px" }}
                readOnly
              />
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>

            {/* Nút Thêm vào giỏ hàng */}
            <button className="btn btn-danger mt-3 w-100 " onClick={handleAddToCart}>
              <i className="bi bi-cart-plus"></i> THÊM VÀO GIỎ
            </button>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="row bg-light mt-3 p-3 rounded">
          <div className="col-md-6 text-center">
            <h4 className="fw-bold">Mô tả</h4>
            <h5 className="fw-bold">{product.title}</h5>
            <img
              src={product.mainImage}
              alt={product.title}
              className="img-fluid my-2"
              style={{ maxWidth: "150px", height: "auto" }}
            />
             <span dangerouslySetInnerHTML={{ __html: product.promotion.description }}></span>
          </div>
          <div className="col-md-6">
            <h4 className="fw-bold">Thông tin</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="fw-bold">Xuất xứ</td>
                  <td>Đang cập nhật</td>
                </tr>
                <tr>
                  <td className="fw-bold">Thành phần</td>
                  <td>Đang cập nhật</td>
                </tr>
                <tr>
                  <td className="fw-bold">Hướng dẫn sử dụng</td>
                  <td>Đang cập nhật</td>
                </tr>
                <tr>
                  <td className="fw-bold">Bảo quản</td>
                  <td>Đang cập nhật</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
