"use client";

import { useState } from "react";
import Link from "next/link";

const API = "https://shalom-o8k7.onrender.com";

export default function AdminPage() {
  /* ================= STATE ================= */
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [activeTab, setActiveTab] = useState("products");
  const [formVisible, setFormVisible] = useState(true);

  const [previewImg, setPreviewImg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");

  /* ================= LOGIN ================= */
  function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "shalom@gmail.com" && pass === "shalom2026") {
      setLoggedIn(true);
      setError("");
      loadData();
    } else {
      setError("❌ Invalid credentials");
    }
  }

  function logout() {
    location.reload();
  }

  /* ================= LOAD DATA ================= */
  async function loadData() {
    try {
      const productRes = await fetch(`${API}/api/products`);
      const inquiryRes = await fetch(`${API}/api/inquiries`);

      setProducts(await productRes.json());
      setInquiries(await inquiryRes.json());
    } catch {
      alert("❌ Backend not running. Start server.js");
    }
  }

  /* ================= FILE UPLOAD ================= */
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 5) {
      alert("❌ Image too large (max 5MB)");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImageFile(null);
    setPreviewImg("");
  }

  /* ================= ADD PRODUCT ================= */
  async function addProduct() {
    const pname = document.getElementById("pname").value;
    const ptype = document.getElementById("ptype").value;
    const pprice = document.getElementById("pprice").value;
    const pdesc = document.getElementById("pdesc").value;
    const pavailability = document.getElementById("pavailability").value;

    if (!imageFile) {
      alert("❌ Select image");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      await fetch(`${API}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pname,
          type: ptype,
          price: Number(pprice),
          description: pdesc,
          availability: pavailability,
          image: reader.result
        })
      });

      clearImage();
      document.getElementById("pname").value = "";
      document.getElementById("ptype").value = "";
      document.getElementById("pprice").value = "";
      document.getElementById("pdesc").value = "";

      loadData();
      alert("✅ Product added successfully");
    };

    reader.readAsDataURL(imageFile);
  }

  async function deleteProduct(id) {
    if (!confirm("Delete product?")) return;
    await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
    loadData();
  }

  async function clearInquiries() {
    if (!confirm("Clear all inquiries?")) return;
    await fetch(`${API}/api/inquiries`, { method: "DELETE" });
    loadData();
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.type.toLowerCase().includes(search)
  );

  /* ================= LOGIN SCREEN ================= */
  if (!loggedIn) {
    return (
      <div className="admin-wrapper">
        <div className="login-screen">
          <div className="login-card">
            <div className="login-logo">
              <div className="logo-circle">S</div>
              <h1>Shalom Admin</h1>
              <p>System Solutions Management</p>
            </div>

            <div className="login-form">
              <div className="input-group">
                <label>👤 Username</label>
                <input id="user" placeholder="Enter username" />
              </div>

              <div className="input-group">
                <label>🔒 Password</label>
                <input id="pass" type="password" placeholder="Enter password" />
              </div>

              <button className="btn-login" onClick={login}>
                <span>Login to Dashboard</span>
                <span className="arrow">→</span>
              </button>

              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="admin-wrapper" id="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-mini">S</div>
          <div>
            <h2>Admin Dashboard</h2>
            <p className="header-subtitle">Shalom System Solutions</p>
          </div>
        </div>

        <div className="header-right">
          <Link href="/" className="btn-link">← Back to Website</Link>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card stat-products">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card stat-inquiries">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{inquiries.length}</h3>
            <p>Customer Inquiries</p>
          </div>
        </div>

        <div className="stat-card stat-available">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{products.filter(p => p.availability === "Available").length}</h3>
            <p>Available Products</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          📦 Products Management
        </button>

        <button
          className={`tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
          onClick={() => setActiveTab("inquiries")}
        >
          📧 Customer Inquiries
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="tab-content active">

          <div className="content-card">
            <div className="card-header">
              <h3>➕ Add New Product</h3>
              <button className="btn-toggle" onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? "Hide Form" : "Show Form"}
              </button>
            </div>

            {formVisible && (
              <div className="add-form">

                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input id="pname" placeholder="e.g., Dell Laptop i5 8GB" />
                  </div>

                  <div className="form-group">
                    <label>Product Type *</label>
                    <input id="ptype" placeholder="e.g., Laptop, Desktop, SSD" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input id="pprice" type="number" placeholder="e.g., 45000" />
                  </div>

                  <div className="form-group">
                    <label>Availability *</label>
                    <select id="pavailability">
                      <option value="Available">✅ Available</option>
                      <option value="Out of Stock">❌ Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea id="pdesc" rows="3" />
                </div>

                <div className="form-group">
                  <label>Product Image *</label>
                  <div className="file-upload-area">
                    <input type="file" accept="image/*" onChange={handleFileSelect} />

                    {!previewImg && (
                      <div className="file-upload-content">
                        <div className="upload-icon">📷</div>
                        <p className="upload-text">Click or drag image here</p>
                        <p className="upload-hint">Max 5MB</p>
                      </div>
                    )}

                    {previewImg && (
                      <div className="image-preview">
                        <img src={previewImg} alt="Preview" />
                        <button className="btn-clear-image" onClick={clearImage}>✕</button>
                      </div>
                    )}
                  </div>
                </div>

                <button className="btn-submit" onClick={addProduct}>
                  <span>Add Product</span>
                  <span className="btn-arrow">→</span>
                </button>

              </div>
            )}
          </div>

          <div className="content-card">
            <div className="search-box">
              <input
                placeholder="🔍 Search products..."
                onChange={e => setSearch(e.target.value.toLowerCase())}
              />
            </div>

            <div className="products-grid">
              {filteredProducts.map(p => (
                <div key={p._id} className="product-item">
                  <img src={p.image} alt="" />
                  <h4>{p.name}</h4>
                  <span>₹{p.price}</span>
                  <button onClick={() => deleteProduct(p._id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INQUIRIES TAB */}
      {activeTab === "inquiries" && (
        <div className="tab-content active">
          <div className="content-card">
            <button className="btn-clear-all" onClick={clearInquiries}>
              🗑️ Clear All
            </button>

            <div className="inquiries-list">
              {inquiries.map((i, idx) => (
                <div key={idx} className="inquiry-item">
                  <h4>{i.name} – {i.phone}</h4>
                  <p><b>Product:</b> {i.product || "-"}</p>
                  <p>{i.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
