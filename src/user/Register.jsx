import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate password length
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
      return; // Don't submit if password is too short
    }

    const userData = {
      phone: userName,
      email: email,
      password: password,
      fullName: fullName,
      dob: dob,
      gender: gender,
      role: "user", // Default role
    };

    // Make API call to register the user
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Clear any previous error messages
        setErrorMessage('');
        // Redirect to OTP verification page on successful registration
        navigate(`/verify-otp?email=${email}`);
      } else {
        console.error('Registration failed:', data.message);
        setErrorMessage(data.message || 'Đăng ký thất bại, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Có lỗi xảy ra trong quá trình đăng ký');
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
                <Link to="/" className="imark-logo1">
                  iMark
                </Link>
              </div>
              <div style={{ width: '50px', textAlign: 'right' }}>
                <a href="/"><i className="fas fa-home" style={{ fontSize: '30px' }}></i></a>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Số điện thoại *"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // Handle email input
                />
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu *"
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

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Họ tên *"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Nam"
                    checked={gender === 'Nam'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male" style={{ marginRight: '10px' }}>Nam</label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Nữ"
                    checked={gender === 'Nữ'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">Nữ</label>
                </div>
              </div>

              {/* Display error message if exists */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: 'orange', color: 'white' }}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
