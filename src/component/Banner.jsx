import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/banner.css';  // Assuming you'll put custom styles here
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Đảm bảo import Bootstrap JS

const Banner = () => {
  return (
    <div className="container mt-4">
      <div className="row border-shadow-wrapper">
        {/* Left Column */}
        <div className="col-md-7 custom-col">
      <div id="carouselExampleAutoplay" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Ảnh 1 */}
          <div className="carousel-item active">
            <img
              src="https://hcm.fstorage.vn/images/2025/02/1302_homebanner_867x400-20250213011540.jpg"
              alt="product"
              className="card-img-top custom-img"
            />
          </div>

          {/* Ảnh 2 */}
          <div className="carousel-item">
            <img
              src="https://hcm.fstorage.vn/images/2024/12/867-x-400-pix_home-banner-20241226102639.png"
              alt="product"
              className="card-img-top custom-img"
            />
          </div>

          {/* Ảnh 3 */}
          <div className="carousel-item">
            <img
              src="https://hcm.fstorage.vn/images/2025/02/867x400-20250214061251.jpg"
              alt="product"
              className="card-img-top custom-img"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
        {/* Right Column with Border */}
        <div className="col-md-5 custom-col">
          <div className="border-wrapper">
            <div className="card mb-4 custom-card">
              <div className="image-container">
                {/* Ảnh 1 */}
                <img
                  src="https://hcm.fstorage.vn/images/2024/12/sub-banner-614x397px-20241209051145.jpg"
                  alt="product"
                  className="card-img-bottom custom-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
