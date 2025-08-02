import React, { useState, useEffect } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // آدرس API بک‌اند برای گرفتن محصولات
    fetch("http://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>مدیریت محصولات</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>نام محصول</th>
            <th style={tableHeaderStyle}>دسته بندی</th>
            <th style={tableHeaderStyle}>قیمت</th>
            <th style={tableHeaderStyle}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tableCellStyle}>{product.name}</td>
              <td style={tableCellStyle}>{product.category}</td>
              <td style={tableCellStyle}>
                {product.price.toLocaleString()} تومان
              </td>
              <td style={tableCellStyle}>
                <button>ویرایش</button>
                <button style={{ marginRight: "5px" }}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// استایل‌های ساده برای جدول
const tableHeaderStyle = {
  padding: "12px",
  textAlign: "right",
  borderBottom: "2px solid #ddd",
};

const tableCellStyle = {
  padding: "12px",
  textAlign: "right",
};

export default ProductsPage;
