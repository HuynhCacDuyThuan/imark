import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { jwtDecode } from "jwt-decode"; 

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      phone: userName,
      password: password,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      
      if (response.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
  
        try {
          const decodedToken = jwtDecode(data.token);
          localStorage.setItem("userId", decodedToken.userId); //  Lưu userId vào localStorage
  
          if (decodedToken?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          setErrorMessage("Invalid token format");
        }
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred during login");
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="form-login p-4 shadow rounded bg-white">
            {/* Header Section with icons */}
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div style={{ width: '30px', textAlign: 'left' }}>
  <i className="fas fa-arrow-left" style={{ fontSize: '30px' }}></i>
</div>

  <div>
  <Link to="/" class="imark-logo1">
                iMark
              </Link>
  </div>
  <div style={{ width: '50px', textAlign: 'right' }}>
                <a href="/"><i className="fas fa-home" style={{ fontSize: '30px' }}></i></a>
              </div>

            </div>

         
         
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
            {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
              <div className="mb-3">
               
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Số điện thoại"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-3">
              
              <div className="input-group">
  <input
    type={passwordVisible ? 'text' : 'password'}
    className="form-control"
    id="password"
    placeholder="Mật khẩu"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    className="btn btn-link"
    onClick={togglePasswordVisibility}
    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
  >
    <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '18px' }}></i>
  </button>
</div>

              </div>

              <button type="submit" className="btn w-100" style={{ backgroundColor: 'red', color: 'white' }}>
  Đăng nhập
</button>

            </form>

            <div className="mt-3 text-center">
              <p style={{ color: 'red' }}>
                <a href="/forgot-password" style={{ textDecoration: 'none' }}>Quên mật khẩu?</a>
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <hr style={{ flex: 1, margin: 0 }} />
                <p className="mx-2" style={{ margin: '0' }}>Hoặc</p>
                <hr style={{ flex: 1, margin: 0 }} />
              </div>
              <p>
                <a href="/register" style={{ textDecoration: 'none', color: 'red' }}>Đăng Ký</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
