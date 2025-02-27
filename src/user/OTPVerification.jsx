import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation to get quer

function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');  // State for email
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  // Get the query parameters from the URL using useLocation
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);  // Access query parameters
    setEmail(urlParams.get('email'));  // Extract email from the URL and set it
  }, [location]);  // Re-run when location changes

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle form submission to verify OTP
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example API call to verify OTP
    try {
      const response = await fetch('http://localhost:5000/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }), // Send email and OTP for verification
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsOtpValid(true);
        navigate("/login")
        setErrorMessage('');
        console.log('OTP verified successfully:', data);
      } else {
        setIsOtpValid(false);
        setErrorMessage(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('An error occurred while verifying OTP.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="form-otp p-4 shadow rounded bg-white">
            <h3 className="text-center mb-4">Verify OTP</h3>
            
            <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {isOtpValid && (
                <div className="alert alert-success" role="alert">
                  OTP verified successfully!
                </div>
              )}

              <button type="submit" className="btn w-100" style={{ backgroundColor: 'red', color: 'white' }}>
                Verify OTP
              </button>
            </form>

            <div className="mt-3 text-center">
              <p>
                <a href="#resendOtp" style={{ textDecoration: 'none', color: 'red' }}>Resend OTP</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
