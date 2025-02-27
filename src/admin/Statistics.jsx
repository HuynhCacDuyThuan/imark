import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Statistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  
  // Fetch the statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/users/"); // Đường dẫn API lấy số lượng người dùng
        const productResponse = await axios.get("http://localhost:5000/api/products/products"); // Đường dẫn API lấy số lượng sản phẩm
        const revenueResponse = await axios.get("http://localhost:5000/api/payment/totalRevenue"); // API lấy tổng số tiền bán được
        const salesResponse = await axios.get("http://localhost:5000/api/payment/salesByMonth"); // API lấy doanh thu theo tháng
        console.log("userResponse" +userResponse)
        setUserCount(userResponse.data.length); // Gán số lượng người dùng
        setProductCount(productResponse.data.length); // Gán số lượng sản phẩm
        setTotalRevenue(revenueResponse.data.totalRevenue); // Gán tổng doanh thu
        setSalesData(salesResponse.data.monthlySales); // Gán dữ liệu doanh thu theo tháng
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    };

    fetchStatistics();
  }, []);

  // Dữ liệu biểu đồ
  const chartData = {
    labels: salesData.map((data) => data.month), // Các tháng trong năm
    datasets: [
      {
        label: "Doanh Thu (VND)",
        data: salesData.map((data) => data.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <h5 className="text-center mb-4">Thống Kê Tổng Quan</h5>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Người Dùng</h5>
              <p className="card-text">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Sản Phẩm</h5>
              <p className="card-text">{productCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Tổng Doanh Thu</h5>
              <p className="card-text">{totalRevenue.toLocaleString()} VND</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Biểu Đồ Doanh Thu Theo Tháng</h5>
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
