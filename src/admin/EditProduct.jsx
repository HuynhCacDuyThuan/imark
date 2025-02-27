import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import AdminHeader from "../component/AdminHeader";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]); 


  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };


  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc"),
    quantity: Yup.number().required("Số lượng là bắt buộc").min(1, "Số lượng phải lớn hơn 0"),
    price: Yup.number().required("Giá sản phẩm là bắt buộc").min(0, "Giá phải lớn hơn hoặc bằng 0"),
    discount: Yup.number().min(0, "Giảm giá phải lớn hơn hoặc bằng 0").max(100, "Giảm giá không thể vượt quá 100%"),
    category: Yup.string().required("Danh mục là bắt buộc"), 
    subtitles: Yup.array().of(Yup.object({ image: Yup.mixed().notRequired() })),
    shipping: Yup.object({ freeShippingThreshold: Yup.string().notRequired() }).notRequired(),
    promotion: Yup.object({ description: Yup.string().notRequired() }).notRequired(),
  });


  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("category", values.category); 
    formData.append("promotion", JSON.stringify(values.promotion));
    formData.append("shipping", JSON.stringify(values.shipping));

    if (values.mainImage && values.mainImage instanceof File) {
      formData.append("mainImage", values.mainImage);
    }

    values.subtitles.forEach((subtitle) => {
      if (subtitle.image && subtitle.image instanceof File) {
        formData.append("subtitles", subtitle.image);
      }
    });

    console.log("Dữ liệu gửi đi:", Object.fromEntries(formData.entries())); // 🛠 Kiểm tra dữ liệu trước khi gửi

    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/products/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Sản phẩm đã được cập nhật thành công!");
      navigate(-1); //  Quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error.response?.data || error.message);
      alert("Lỗi khi cập nhật sản phẩm: " + (error.response?.data?.message || error.message));
    }
  };

  if (!product) return <div className="text-center">Đang tải dữ liệu...</div>;

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <h2> Chỉnh sửa sản phẩm</h2>
        <Formik
          initialValues={{
            title: product.title,
            mainImage: product.mainImage,
            quantity: product.quantity,
            price: product.price,
            discount: product.discount,
            category: product.category || "", 
            subtitles: product.subtitles || [{ image: null }],
            shipping: product.shipping || { freeShippingThreshold: "" },
            promotion: product.promotion || { description: "" },
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Tên sản phẩm</label>
                <Field type="text" className="form-control" name="title" placeholder="Nhập tiêu đề sản phẩm" />
              </div>

              <div className="mb-3">
                <label className="form-label">Danh mục</label>
                <Field as="select" className="form-control" name="category">
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="mb-3">
                <label className="form-label">Số lượng sản phẩm</label>
                <Field type="number" className="form-control" name="quantity" placeholder="Nhập số lượng sản phẩm" />
              </div>

              <div className="mb-3">
                <label className="form-label">Giá sản phẩm</label>
                <Field type="number" className="form-control" name="price" placeholder="Nhập giá sản phẩm" />
              </div>

              <div className="mb-3">
                <label className="form-label">Giảm giá (%)</label>
                <Field type="number" className="form-control" name="discount" placeholder="Nhập giảm giá (%)" />
              </div>

              <div className="mb-3">
                <label className="form-label">Ảnh chính</label>
                <input type="file" accept="image/*" className="form-control" onChange={(e) => setFieldValue("mainImage", e.target.files[0])} />
                {values.mainImage && typeof values.mainImage === "string" && (
                  <img src={values.mainImage} alt="Ảnh hiện tại" className="img-thumbnail mt-2" style={{ width: "150px" }} />
                )}
              </div>
  <FieldArray name="subtitles">
                {({ push, remove }) => (
                  <div>
                    {values.subtitles.map((subtitle, index) => (
                      <div key={index} className="mb-3 row d-flex flex-wrap">
                        <div className="col-md-4">
                          <input type="file" accept="image/*" onChange={(e) => setFieldValue(`subtitles[${index}].image`, e.target.files[0])} className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn btn-link" onClick={() => push({ image: null })}>
                      Thêm ảnh phụ
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Lưu cập nhật
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
                  Quay lại
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProduct;
