import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/profile.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBox, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Orders from '../component/Orders';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId"); //  Lấy userId từ LocalStorage
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    country: "",
    province: "",
    district: "",
    ward: "",
    houseNumber: "",
  });


  useEffect(() => {
    axios.get("https://open.oapi.vn/location/countries")
      .then(response => setCountries(response.data.data))
      .catch(error => console.error("Lỗi khi lấy danh sách quốc gia:", error));
  }, []);


  useEffect(() => {
    axios.get("https://open.oapi.vn/location/provinces?page=0&size=65")
      .then(response => setProvinces(response.data.data))
      .catch(error => console.error("Lỗi khi lấy danh sách tỉnh:", error));
  }, []);


  useEffect(() => {
    if (formData.province) {
      axios.get(`https://open.oapi.vn/location/districts/${formData.province}?page=0&size=30`)
        .then(response => setDistricts(response.data.data))
        .catch(error => console.error("Lỗi khi lấy danh sách quận:", error));
    }
  }, [formData.province]);

  //  4. Lấy danh sách phường/xã khi chọn quận
  useEffect(() => {
    if (formData.district) {
      axios.get(`https://open.oapi.vn/location/wards/${formData.district}?page=0&size=30`)
        .then(response => setWards(response.data.data))
        .catch(error => console.error("Lỗi khi lấy danh sách phường:", error));
    }
  }, [formData.district]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  
    axios.get(`http://localhost:5000/api/users/profile/${userId}`)
      .then(response => {
        console.log("User data received:", response.data); // Log the response data
        setFormData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [userId, navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Xóa userId
    localStorage.removeItem("token");  // Xóa token
    navigate("/"); // Chuyển hướng về trang đăng nhập
  };
  if (!formData) {
    return <p className="text-center mt-5">Đang tải thông tin...</p>;
  }
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        {/* Left Column (3 cols) */}
        <div className="col-md-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'account' ? 'active' : ''}`}
                href="#"
                onClick={() => handleNavClick('account')}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Tài khoản
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`}
                href="#"
                onClick={() => handleNavClick('orders')}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Đơn hàng đã mua
              </a>
            </li>

           

            <li className="nav-item">
  <a className="nav-link text-danger" href="#" onClick={handleLogout}>
    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
    Đăng xuất
  </a>
</li>

          </ul>
        </div>

        {/* Right Column (9 cols) */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
            {activeSection === 'account' && ( <div>
              <h4 className="card-title">Thông tin tài khoản</h4>
             
                <form onSubmit={handleUpdate}>
             

                <div className="form-group">
                  <label>Họ tên</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Giới tính</label>
                  <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div className="form-group">
  <label htmlFor="dob">Ngày sinh</label>
  <input
    type="date"
    className="form-control"
    id="dob"
    name="dob"
    value={formData.dob ? formData.dob.split("T")[0] : ""}
    onChange={handleChange}
  />
</div>

                <div className="form-group">
                  <label>Quốc gia</label>
                  <select className="form-control" name="country" value={formData.country} onChange={handleChange}>
                    {countries.map((country) => (
                      <option key={country.id} value={country.niceName}>{country.niceName}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tỉnh/Thành phố</label>
                  <select className="form-control" name="province" value={formData.province} onChange={handleChange}>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quận/Huyện</label>
                  <select className="form-control" name="district" value={formData.district} onChange={handleChange} disabled={!formData.province}>
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phường/Xã</label>
                  <select className="form-control" name="ward" value={formData.ward} onChange={handleChange} disabled={!formData.district}>
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.id}>{ward.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label>Số nhà</label>
                  <input type="text" className="form-control" name="houseNumber" value={formData.houseNumber} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Cập nhật</button>
              </form>
            </div>   )}
            {activeSection === 'orders' && (
                <div>
                  <Orders/>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
