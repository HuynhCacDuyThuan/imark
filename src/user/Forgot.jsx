import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      email: email,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert('A new password has been sent to your email.');
      } else {
        setErrorMessage(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while requesting password reset');
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

            <h5 className="text-center mb-4">Lấy lại Mật khẩu</h5>

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email (Gmail)"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

            

              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: 'orange', color: 'white' }}
              >
              Lấy lại mật khẩu
              </button>
            </form>

            <div className="mt-3 text-center">
       
              <div className="d-flex justify-content-center align-items-center">
                <hr style={{ flex: 1, margin: 0 }} />
                <p className="mx-2" style={{ margin: '0' }}>Hoặc</p>
                <hr style={{ flex: 1, margin: 0 }} />
              </div>
              <p>
                <a href="/login" style={{ textDecoration: 'none', color: 'red' }}>Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
