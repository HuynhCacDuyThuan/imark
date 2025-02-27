import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';  // Custom CSS for additional styling
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="container-fuild mt-5">
      <div className="row footer-top-block">
        {/* Free Delivery Section */}
        <div className="col-md-3 footer-top-block-item">
          <div className="footer-content">
            <img
              src="https://hcm.fstorage.vn/images/2024/wmt_delivery.jpg"
              alt="Miễn phí giao hàng"
              className="footer-img"
            />
            <h3 className="about-us">Miễn phí giao hàng</h3>
            <strong className="offer-amount">từ 300.000 VNĐ</strong>
          </div>
        </div>

        {/* 2H Fast Delivery Section */}
        <div className="col-md-3 footer-top-block-item">
          <div className="footer-content">
            <img
              src="https://hcm.fstorage.vn/images/2024/wmt_2h.jpg"
              alt="Giao hàng nhanh 2H"
              className="footer-img"
            />
            <h3 className="about-us">Giao hàng nhanh 2H</h3>
          </div>
        </div>

        {/* 62 Provinces Section */}
        <div className="col-md-3 footer-top-block-item">
          <div className="footer-content">
            <img
              src="https://hcm.fstorage.vn/images/2024/wmt_location.jpg"
              alt="62 Tỉnh thành"
              className="footer-img"
            />
            <h3 className="about-us">62 Tỉnh thành</h3>
          </div>
        </div>

        {/* Exclusive Prices Section */}
        <div className="col-md-3 footer-top-block-item">
          <div className="footer-content">
            <img
              src="https://hcm.fstorage.vn/images/2024/WiN.png"
              alt="Giá độc quyền"
              className="footer-img"
            />
            <h3 className="about-us">Giá độc quyền</h3>
            <h3 className="about-us">Hội viên WiN</h3>
          </div>
        </div>
      </div>

      <div className="footer-content-block mt-4 ">
      <div className="container">
        <div className="row">
          {/* Footer Logo and Info */}
          <div className="col-md-3">
            <div className="footer-content-section">
              <h4 className="footer-title footer-logo">
                <Link to="/" class="imark-logo">
                iMark
              </Link>
              </h4>
              <div className="footer-link-winmart">
                Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              </div>
              <div className="footer-link-winmart">
                Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010,
                đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023
              </div>
              <a
                href="http://online.gov.vn/Home/WebDetails/10976?AspxAutoDetectCookieSupport=1"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="bo-cong-thuong"
                  src="https://winmart.vn/_next/static/images/logoSaleNoti-f3d3b02c52d6144889ea6a5cbc6f0f19.png"
                  className="footer-img"
                />
              </a>
            </div>
          </div>

          {/* About Us Section */}
          <div className="col-md-3">
            <div className="footer-content-section">
              <h4 className="footer-title">Về chúng tôi</h4>
              <div>
                <a href="/info/about" className="footer-link" target="_blank" rel="noreferrer">
                  Giới thiệu về WinMart
                </a>
                <a
                  href="/info/danh-sach-cua-hang"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Danh sách cửa hàng
                </a>
                <a
                  href="/info/quan-ly-chat-luong"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Quản lý chất lượng
                </a>
                <a
                  href="/info/privacy-policy"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="/info/transaction-policy"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Điều khoản và điều kiện giao dịch
                </a>
              </div>
            </div>
          </div>

          {/* Customer Support Section */}
          <div className="col-md-3">
            <div className="footer-content-section">
              <h4 className="footer-title">Hỗ trợ khách hàng</h4>
              <a
                href="/info/customer-support"
                className="footer-link"
                target="_blank"
                rel="noreferrer"
              >
                Trung tâm hỗ trợ khách hàng
              </a>
              <a href="/info/delivery-policy" className="footer-link" target="_blank" rel="noreferrer">
                Chính sách giao hàng
              </a>
              <a href="/info/payment-policy" className="footer-link" target="_blank" rel="noreferrer">
                Chính sách thanh toán
              </a>
              <a
                href="/info/return-and-exchange-policy"
                className="footer-link"
                target="_blank"
                rel="noreferrer"
              >
                Chính sách đổi trả
              </a>
              <a href="/danh-gia-gop-y" className="footer-link" target="_blank" rel="noreferrer">
                Đánh giá góp ý
              </a>
              <a href="/danh-sach-giai-thuong" className="footer-link" target="_blank" rel="noreferrer">
                Danh sách trúng thưởng
              </a>
            </div>
          </div>

          {/* Customer Care and Social Connect Section */}
          <div className="col-md-3">
            <div className="footer-content-section">
              <h4 className="footer-title">Chăm sóc khách hàng</h4>
              <div>
                <a href="tel:02471066866" className="footer-link">
                  Mua Online: 0247 1066866
                </a>
              </div>
              <div>
                <a href="mailto:cskh@winmart.masangroup.com" className="footer-link">
                  Email: cskh@winmart.masangroup.com
                </a>
              </div>

              <h4 className="footer-title mt-4">Kết nối với chúng tôi</h4>
              <div className="connect-info">
                <a
                  href="https://www.facebook.com/sieuthiwinmart"
                  className="connect-icon"
                  target="_blank"
                  title="Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCLo59yYY_gwbKHy67mZtNsQ/videos"
                  className="connect-icon"
                  target="_blank"
                  title="Youtube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://zalo.me/300086756699856746"
                  className="connect-icon"
                  target="_blank"
                  title="Zalo"
                >
                  <i className="fab fa-zalo"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
