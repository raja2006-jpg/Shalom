/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API = "https://shalom-kappa.vercel.app";
const SESSION_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

/* --- Icons --- */
const DashboardIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const PackageIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const MailIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const BellIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const MenuIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const SearchIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const LogoutIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

export default function AdminPage() {
  /* ================= STATE ================= */
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [activeTab, setActiveTab] = useState("dashboard"); // changed default to match UI better, maps to actual views
  const [formVisible, setFormVisible] = useState(false);

  const [previewImg, setPreviewImg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");

  // New UI states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* ================= SESSION CHECK ================= */
  useEffect(() => {
    const sessionExpiry = localStorage.getItem("adminSessionExpiry");
    if (sessionExpiry) {
      const expiryTime = parseInt(sessionExpiry, 10);
      const currentTime = new Date().getTime();

      if (currentTime < expiryTime) {
        setLoggedIn(true);
        loadData();
      } else {
        localStorage.removeItem("adminSessionExpiry");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  /* ================= LOGIN ================= */
  function login(e) {
    if (e) e.preventDefault();
    const user = document.getElementById("user")?.value;
    const pass = document.getElementById("pass")?.value;

    if (user === "shalom@gmail.com" && pass === "shalom2026") {
      const expiryTime = new Date().getTime() + SESSION_DURATION;
      localStorage.setItem("adminSessionExpiry", expiryTime.toString());

      setLoggedIn(true);
      setError("");
      loadData();
    } else {
      setError("Invalid credentials");
    }
  }

  function logout() {
    localStorage.removeItem("adminSessionExpiry");
    location.reload();
  }

  /* ================= LOAD DATA ================= */
  async function loadData() {
    setIsLoading(true);
    try {
      const productRes = await fetch(`${API}/api/products`);
      const inquiryRes = await fetch(`${API}/api/inquiries`);

      setProducts(await productRes.json());
      setInquiries(await inquiryRes.json());
    } catch {
      alert("❌ Backend not running. Could not load data.");
    } finally {
      setIsLoading(false);
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
  async function addProduct(e) {
    if (e) e.preventDefault();
    const pname = document.getElementById("pname")?.value;
    const ptype = document.getElementById("ptype")?.value;
    const pprice = document.getElementById("pprice")?.value;
    const pdesc = document.getElementById("pdesc")?.value;
    const pavailability = document.getElementById("pavailability")?.value;

    if (!imageFile) {
      alert("❌ Select an image for the product");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
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
        setFormVisible(false); // Auto close form on success

        loadData();
        alert("✅ Product added successfully");
      } catch (err) {
        alert("❌ Failed to add product.");
      }
    };

    reader.readAsDataURL(imageFile);
  }

  async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
      loadData();
    } catch (err) {
      alert("❌ Failed to delete product.");
    }
  }

  async function clearInquiries() {
    if (!confirm("Are you sure you want to clear all inquiries? This action cannot be undone.")) return;
    try {
      await fetch(`${API}/api/inquiries`, { method: "DELETE" });
      loadData();
    } catch (err) {
      alert("❌ Failed to clear inquiries.");
    }
  }

  const filteredProducts = products.filter(p =>
    (p.name?.toLowerCase() || "").includes(search) ||
    (p.type?.toLowerCase() || "").includes(search)
  );

  /* ================= SKELETON LOADER ================ */
  const renderSkeleton = () => (
    <div className="pro-skeleton-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="pro-card pro-skeleton" style={{ height: '200px' }}>
          <div className="pro-skeleton-img" style={{ height: '60px', width: '60px', borderRadius: '50%', marginBottom: '16px' }} />
          <div className="pro-skeleton-line" style={{ width: '60%', height: '16px', marginBottom: '8px' }} />
          <div className="pro-skeleton-line" style={{ width: '40%', height: '12px' }} />
        </div>
      ))}
    </div>
  );

  /* ================= LOGIN SCREEN ================ */
  if (isLoading && !loggedIn) {
    return <div className="pro-loading-screen"><div className="pro-spinner"></div></div>;
  }

  if (!loggedIn) {
    return (
      <div className="pro-login-wrapper">
        <div className="pro-login-card">
          <div className="pro-login-header">
            <div className="pro-login-logo">S</div>
            <h2>Admin Login</h2>
            <p>Access your dashboard</p>
          </div>

          <form className="pro-login-form" onSubmit={login}>
            <div className="pro-input-group">
              <label>Email Address</label>
              <input id="user" type="email" placeholder="admin@shalom.com" required />
            </div>

            <div className="pro-input-group">
              <label>Password</label>
              <input id="pass" type="password" placeholder="••••••••" required />
            </div>

            {error && <div className="pro-alert pro-alert-danger">{error}</div>}

            <button type="submit" className="pro-btn pro-btn-primary pro-w-full">
              Sign In to Dashboard
            </button>
            <Link href="/" className="pro-login-back">← Back to Website</Link>
          </form>
        </div>

        {/* CSS Scoped Just for Login */}
        <style>{`
          .pro-login-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            font-family: var(--font-primary);
            padding: 20px;
          }
          .pro-login-card {
            background: #ffffff;
            width: 100%;
            max-width: 420px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            padding: 40px 32px;
          }
          .pro-login-header { text-align: center; margin-bottom: 32px; }
          .pro-login-logo {
            width: 56px; height: 56px;
            background: #0f172a;
            color: #fff;
            font-size: 24px; font-weight: 700;
            display: flex; align-items: center; justify-content: center;
            border-radius: 14px;
            margin: 0 auto 16px;
          }
          .pro-login-header h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
          .pro-login-header p { color: #64748b; font-size: 15px; }
          .pro-input-group { margin-bottom: 20px; }
          .pro-input-group label { display: block; font-size: 14px; font-weight: 500; color: #334155; margin-bottom: 8px; }
          .pro-input-group input { 
            width: 100%; padding: 12px 16px; border-radius: 8px; 
            border: 1px solid #cbd5e1; outline: none; transition: border 0.2s; 
          }
          .pro-input-group input:focus { border-color: #0f172a; }
          .pro-alert { padding: 12px; border-radius: 8px; font-size: 14px; margin-bottom: 20px; }
          .pro-alert-danger { background: #fee2e2; color: #b91c1c; }
          .pro-btn { padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
          .pro-btn-primary { background: #0f172a; color: #fff; }
          .pro-btn-primary:hover { background: #1e293b; }
          .pro-w-full { width: 100%; }
          .pro-login-back { display: block; text-align: center; margin-top: 24px; color: #64748b; text-decoration: none; font-size: 14px; }
          .pro-login-back:hover { color: #0f172a; }
        `}</style>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="pro-admin-layout">
      {/* ── SIDEBAR ── */}
      <aside className={`pro-sidebar ${sidebarOpen ? '' : 'collapsed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="pro-sidebar-brand">
          <div className="pro-logo-mark">S</div>
          {sidebarOpen && <span className="pro-logo-text">Shalom Admin</span>}
          <button className="pro-toggle-btn d-none d-md-flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon />
          </button>
          <button className="pro-toggle-btn d-md-none" onClick={() => setMobileMenuOpen(false)}>
            ✕
          </button>
        </div>

        <div className="pro-sidebar-menu">
          <p className="pro-menu-label">{sidebarOpen ? 'MENU' : '...'}</p>
          <nav>
            <button className={`pro-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}>
              <DashboardIcon /> {sidebarOpen && <span>Dashboard Overview</span>}
            </button>
            <button className={`pro-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}>
              <PackageIcon /> {sidebarOpen && <span>Product Catalog</span>}
            </button>
            <button className={`pro-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => { setActiveTab('inquiries'); setMobileMenuOpen(false); }}>
              <MailIcon /> {sidebarOpen && <span>Customer Inquiries</span>}
              {sidebarOpen && inquiries.length > 0 && <span className="pro-badge">{inquiries.length}</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && <div className="pro-sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="pro-main-content">

        {/* ── HEADER ── */}
        <header className="pro-top-header">
          <div className="pro-header-left">
            <button className="pro-icon-btn d-md-none" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </button>
            <div className="pro-search-wrapper d-none d-sm-flex">
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="pro-header-right">
            <Link href="/" className="pro-link-external d-none d-sm-block">View Live Site</Link>
            <button className="pro-icon-btn" title="Notifications">
              <BellIcon />
              {inquiries.length > 0 && <span className="pro-alert-dot"></span>}
            </button>
            <div className="pro-divider-v"></div>
            <div className="pro-profile-menu">
              <div className="pro-avatar">A</div>
              <span className="pro-username d-none d-sm-block">Admin User</span>
            </div>
            <button className="pro-icon-btn pro-logout-btn" onClick={logout} title="Logout">
              <LogoutIcon />
            </button>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className="pro-content-inner">

          {/* Dashboard Title */}
          <div className="pro-page-header">
            <div>
              <h1 className="pro-page-title">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'products' && 'Product Management'}
                {activeTab === 'inquiries' && 'Inquiries Inbox'}
              </h1>
              <p className="pro-page-subtitle">Welcome back, here's what's happening today.</p>
            </div>
            {activeTab === 'products' && (
              <button className="pro-btn pro-btn-primary" onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Cancel Add' : '+ Add New Product'}
              </button>
            )}
            {activeTab === 'inquiries' && (
              <button className="pro-btn pro-btn-danger" onClick={clearInquiries} disabled={inquiries.length === 0}>
                Trash All Messages
              </button>
            )}
          </div>

          {isLoading ? renderSkeleton() : (
            <>
              {/* === DASHBOARD TAB === */}
              {activeTab === 'dashboard' && (
                <>
                  <div className="pro-stats-grid">
                    <div className="pro-stat-card">
                      <div className="pro-stat-icon bg-blue"><PackageIcon /></div>
                      <div className="pro-stat-details">
                        <p>Total Products</p>
                        <h3>{products.length}</h3>
                      </div>
                    </div>
                    <div className="pro-stat-card">
                      <div className="pro-stat-icon bg-green"><MailIcon /></div>
                      <div className="pro-stat-details">
                        <p>New Inquiries</p>
                        <h3>{inquiries.length}</h3>
                      </div>
                    </div>
                    <div className="pro-stat-card">
                      <div className="pro-stat-icon bg-purple"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                      <div className="pro-stat-details">
                        <p>Available Stock</p>
                        <h3>{products.filter(p => p.availability === "Available").length}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="pro-card pro-mt">
                    <div className="pro-card-header">
                      <h3>Recent Activity Summary</h3>
                    </div>
                    <div className="pro-card-body">
                      {inquiries.length === 0 && products.length === 0 ? (
                        <p className="pro-text-muted">No data available in the system yet.</p>
                      ) : (
                        <ul className="pro-activity-list">
                          {inquiries.slice(0, 3).map((inq, i) => (
                            <li key={`inq-${i}`}>
                              <span className="pro-dot bg-green"></span>
                              <span>New inquiry received from <b>{inq.name}</b> regarding <i>{inq.product || 'general'}</i></span>
                            </li>
                          ))}
                          {products.slice(0, 3).map((p, i) => (
                            <li key={`prod-${i}`}>
                              <span className="pro-dot bg-blue"></span>
                              <span>Product catalog has <b>{p.name}</b> in database</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* === PRODUCTS TAB === */}
              {activeTab === 'products' && (
                <>
                  {/* Add Product Form */}
                  {formVisible && (
                    <div className="pro-card pro-form-card pro-fade-in mb-4">
                      <div className="pro-card-header">
                        <h3>Product Details</h3>
                        <span className="pro-text-muted text-sm">Fill in the information to list a new product.</span>
                      </div>
                      <div className="pro-card-body">
                        <form onSubmit={addProduct}>
                          <div className="pro-grid-2">
                            <div className="pro-input-group">
                              <label>Product Name <span className="req">*</span></label>
                              <input id="pname" placeholder="e.g., Dell Laptop i5 8GB" required />
                            </div>
                            <div className="pro-input-group">
                              <label>Product Category <span className="req">*</span></label>
                              <input id="ptype" placeholder="e.g., Laptop, Desktop" required />
                            </div>
                            <div className="pro-input-group">
                              <label>Price (₹) <span className="req">*</span></label>
                              <input id="pprice" type="number" placeholder="45000" min="0" required />
                            </div>
                            <div className="pro-input-group">
                              <label>Stock Status <span className="req">*</span></label>
                              <select id="pavailability">
                                <option value="Available">In Stock & Available</option>
                                <option value="Out of Stock">Out of Stock</option>
                              </select>
                            </div>
                          </div>

                          <div className="pro-input-group">
                            <label>Product Description <span className="req">*</span></label>
                            <textarea id="pdesc" rows="3" placeholder="Enter detailed specifications..." required />
                          </div>

                          <div className="pro-input-group">
                            <label>Product Image <span className="req">*</span></label>
                            <div className="pro-file-upload">
                              <input type="file" accept="image/*" onChange={handleFileSelect} className="pro-file-input" />
                              {!previewImg ? (
                                <div className="pro-upload-placeholder">
                                  <div className="pro-upload-icon"><PackageIcon /></div>
                                  <p>Click or drag image here</p>
                                  <span>PNG, JPG up to 5MB</span>
                                </div>
                              ) : (
                                <div className="pro-image-preview">
                                  <img src={previewImg} alt="Preview" />
                                  <button type="button" className="pro-btn-remove" onClick={clearImage}>Remove Image</button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pro-form-actions">
                            <button type="button" className="pro-btn pro-btn-outline" onClick={() => setFormVisible(false)}>Cancel</button>
                            <button type="submit" className="pro-btn pro-btn-primary">Save Product</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Products Table/List */}
                  <div className="pro-card">
                    <div className="pro-card-header flex-between">
                      <h3>Inventory List</h3>
                      <div className="pro-search-box">
                        <SearchIcon />
                        <input type="text" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value.toLowerCase())} />
                      </div>
                    </div>

                    <div className="pro-table-responsive">
                      <table className="pro-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.length === 0 ? (
                            <tr><td colSpan="6" className="text-center padding-xl">No products matched your search.</td></tr>
                          ) : (
                            filteredProducts.map(p => (
                              <tr key={p._id}>
                                <td>
                                  <div className="pro-td-image">
                                    <img src={p.image || "/images/placeholder.png"} alt={p.name} />
                                  </div>
                                </td>
                                <td className="font-medium text-dark">{p.name}</td>
                                <td><span className="pro-chip">{p.type}</span></td>
                                <td className="font-semibold">₹{parseFloat(p.price).toLocaleString()}</td>
                                <td>
                                  <span className={`pro-status ${p.availability === 'Available' ? 'status-success' : 'status-danger'}`}>
                                    {p.availability || 'Available'}
                                  </span>
                                </td>
                                <td className="text-right">
                                  <button className="pro-icon-btn text-danger" onClick={() => deleteProduct(p._id)} title="Delete Product">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* === INQUIRIES TAB === */}
              {activeTab === 'inquiries' && (
                <div className="pro-card">
                  <div className="pro-card-header">
                    <h3>Inbox & Messages</h3>
                  </div>
                  <div className="pro-table-responsive">
                    <table className="pro-table">
                      <thead>
                        <tr>
                          <th>Customer Info</th>
                          <th>Inquired Product</th>
                          <th>Message</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.length === 0 ? (
                          <tr><td colSpan="4" className="text-center padding-xl">Your inbox is completely empty.</td></tr>
                        ) : (
                          inquiries.map((inq, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="pro-customer-info">
                                  <strong>{inq.name}</strong>
                                  <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                                </div>
                              </td>
                              <td>{inq.product ? <span className="pro-chip">{inq.product}</span> : <span className="pro-text-muted">General Inquiry</span>}</td>
                              <td><p className="pro-msg-truncate" title={inq.message}>{inq.message}</p></td>
                              <td className="pro-text-muted text-sm">New</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* ── HIGH-END GLOBAL DASHBOARD CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Base & Resets */
        .pro-admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f1f5f9;
          font-family: var(--font-primary);
          color: #334155;
          overflow-x: hidden;
        }
        
        button { cursor: pointer; font-family: inherit; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .text-dark { color: #0f172a; }
        .pro-text-muted { color: #64748b; }
        .text-sm { font-size: 13px; }
        .text-danger { color: #ef4444 !important; }
        .padding-xl { padding: 48px !important; }
        .pro-mt { margin-top: 24px; }
        .mb-4 { margin-bottom: 24px; }
        .req { color: #ef4444; }

        /* Utility classes */
        .d-none { display: none; }
        @media (min-width: 768px) { .d-md-none { display: none !important; }; .d-md-flex { display: flex !important; } }
        @media (min-width: 640px) { .d-sm-none { display: none !important; }; .d-sm-flex { display: flex !important; }; .d-sm-block { display: block !important;} }

        /* Sidebar */
        .pro-sidebar {
          width: 260px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          flex-shrink: 0;
        }
        .pro-sidebar.collapsed { width: 80px; }
        .pro-sidebar-brand {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid #f1f5f9;
          gap: 12px;
        }
        .pro-sidebar.collapsed .pro-sidebar-brand { padding: 0; justify-content: center; }
        .pro-logo-mark {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #0f172a, #334155);
          color: white; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; flex-shrink: 0;
        }
        .pro-logo-text { font-weight: 700; font-size: 16px; color: #0f172a; white-space: nowrap; flex-grow: 1; }
        .pro-sidebar-menu { padding: 24px 16px; flex-grow: 1; }
        .pro-menu-label { font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 12px; padding: 0 12px; text-transform: uppercase; white-space: nowrap;}
        
        .pro-nav-item {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 12px;
          background: transparent; border: none; border-radius: 8px;
          color: #475569; font-size: 15px; font-weight: 500;
          transition: all 0.2s; white-space: nowrap;
          margin-bottom: 4px;
        }
        .pro-sidebar.collapsed .pro-nav-item { justify-content: center; padding: 12px 0; }
        .pro-nav-item:hover { background: #f8fafc; color: #0f172a; }
        .pro-nav-item.active { background: #ebf5ff; color: #2563eb; font-weight: 600; }
        .pro-nav-item svg { flex-shrink: 0; }
        .pro-badge { margin-left: auto; background: #ef4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;}

        /* Main Content wrapper */
        .pro-main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* Top Header */
        .pro-top-header {
          height: 70px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex; alignItems: center; justify-content: space-between;
          padding: 0 32px;
          flex-shrink: 0;
        }
        .pro-header-left, .pro-header-right { display: flex; align-items: center; gap: 16px; }
        .pro-search-wrapper {
          display: flex; align-items: center; gap: 8px;
          background: #f1f5f9; padding: 8px 16px; border-radius: 20px;
          color: #64748b;
        }
        .pro-search-wrapper input { background: transparent; border: none; outline: none; font-size: 14px; width: 200px; }
        
        .pro-icon-btn {
          width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent;
          color: #64748b; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; position: relative;
        }
        .pro-icon-btn:hover { background: #f1f5f9; color: #0f172a; }
        .pro-alert-dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid #fff; }
        .pro-divider-v { width: 1px; height: 24px; background: #e2e8f0; margin: 0 8px; }
        .pro-profile-menu { display: flex; align-items: center; gap: 12px; }
        .pro-avatar { width: 36px; height: 36px; border-radius: 50%; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .pro-username { font-weight: 600; font-size: 14px; color: #0f172a; }
        .pro-logout-btn:hover { color: #ef4444; background: #fee2e2; }
        .pro-link-external { font-size: 13px; font-weight: 600; color: #64748b; text-decoration: none; padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s;}
        .pro-link-external:hover { background: #f8fafc; color: #0f172a; }

        /* Content Area Inner */
        .pro-content-inner {
          padding: 32px;
          flex-grow: 1;
          overflow-y: auto;
        }

        /* Page Headers */
        .pro-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; }
        .pro-page-title { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.5px;}
        .pro-page-subtitle { font-size: 15px; color: #64748b; }

        /* Buttons */
        .pro-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
          border: 1px solid transparent; transition: all 0.2s; white-space: nowrap;
        }
        .pro-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .pro-btn-primary { background: #0f172a; color: white; }
        .pro-btn-primary:hover { background: #1e293b; box-shadow: 0 4px 12px rgba(15,23,42,0.15); }
        .pro-btn-danger { background: #ef4444; color: white; }
        .pro-btn-danger:not(:disabled):hover { background: #dc2626; box-shadow: 0 4px 12px rgba(239,68,68,0.2); }
        .pro-btn-outline { background: transparent; border-color: #cbd5e1; color: #475569; }
        .pro-btn-outline:hover { background: #f8fafc; color: #0f172a; }

        /* Cards */
        .pro-card {
           background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -2px rgba(0,0,0,0.02);
           overflow: hidden;
        }
        .pro-card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
        .pro-card-header h3 { font-size: 16px; font-weight: 600; color: #0f172a; }
        .pro-card-header.flex-between { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;}
        .pro-card-body { padding: 24px; }

        /* Stats Grid */
        .pro-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        .pro-stat-card { background: #fff; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .pro-stat-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; }
        .bg-blue { background: #3b82f6; } .bg-green { background: #10b981; } .bg-purple { background: #8b5cf6; }
        .pro-stat-details p { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
        .pro-stat-details h3 { font-size: 28px; font-weight: 800; color: #0f172a; line-height: 1; }

        /* Tables */
        .pro-table-responsive { overflow-x: auto; }
        .pro-table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .pro-table th { background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 12px 24px; text-align: left; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .pro-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 14px; }
        .pro-table tbody tr:hover { background: #f8fafc; }
        .pro-table tbody tr:last-child td { border-bottom: none; }
        
        .pro-td-image { width: 48px; height: 48px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .pro-td-image img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .pro-chip { display: inline-flex; padding: 4px 10px; background: #f1f5f9; color: #475569; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .pro-status { display: inline-flex; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .status-success { background: #dcfce7; color: #166534; }
        .status-danger { background: #fee2e2; color: #991b1b; }
        
        /* Table Search inside header */
        .pro-search-box { display: flex; align-items: center; gap: 8px; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; background: #fff;}
        .pro-search-box input { border: none; outline: none; font-size: 14px; width: 100%; min-width: 200px; }
        .pro-search-box:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

        /* Forms */
        .pro-form-card { background: #f8fafc; border: 1px dashed #cbd5e1; }
        .pro-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pro-input-group { margin-bottom: 20px; }
        .pro-input-group label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 8px; }
        .pro-input-group input, .pro-input-group select, .pro-input-group textarea {
            width: 100%; padding: 10px 14px; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-size: 14px; transition: border 0.2s; font-family: inherit;
        }
        .pro-input-group input:focus, .pro-input-group select:focus, .pro-input-group textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.1); }
        .pro-input-group textarea { resize: vertical; min-height: 100px; }
        .pro-form-actions { display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 8px; }

        /* File Upload UI */
        .pro-file-upload { position: relative; border: 2px dashed #cbd5e1; border-radius: 12px; background: #fff; text-align: center; overflow: hidden; transition: border 0.2s;}
        .pro-file-upload:hover { border-color: #94a3b8; }
        .pro-file-input { position: absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer; }
        .pro-upload-placeholder { padding: 40px; }
        .pro-upload-icon { color: #94a3b8; margin-bottom: 12px; font-size: 32px; }
        .pro-upload-placeholder p { font-size: 15px; font-weight: 600; color: #334155; margin-bottom: 4px; }
        .pro-upload-placeholder span { font-size: 13px; color: #64748b; }
        .pro-image-preview { position: relative; width: 100%; height: 200px; background: #f8fafc; display: flex; align-items: center; justify-content: center;}
        .pro-image-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
        .pro-btn-remove { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; z-index: 2; cursor: pointer; }
        .pro-btn-remove:hover { background: #ef4444; }

        /* Inquiry List Specifics */
        .pro-customer-info { display: flex; flex-direction: column; gap: 4px; }
        .pro-customer-info strong { font-weight: 600; color: #0f172a; }
        .pro-customer-info a { color: #3b82f6; text-decoration: none; font-size: 13px; }
        .pro-msg-truncate { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Activity List */
        .pro-activity-list { list-style: none; padding: 0; margin: 0; }
        .pro-activity-list li { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .pro-activity-list li:last-child { border: none; padding-bottom: 0;}
        .pro-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

        /* Loaders & Skeletons */
        .pro-fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .pro-skeleton-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; padding: 24px 0;}
        .pro-skeleton { pointer-events: none; border: none !important; box-shadow: 0 4px 6px rgba(0,0,0,0.02); padding: 24px; background: #fff;}
        .pro-skeleton-img, .pro-skeleton-line {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          border-radius: 6px;
          animation: pro-shimmer 1.5s infinite linear;
        }
        @keyframes pro-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .pro-loading-screen { position: fixed; inset: 0; background: #f8fafc; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .pro-spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #0f172a; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Mobile Adjustments */
        .pro-sidebar-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); backdrop-filter: blur(2px); z-index: 900; }
        @media (max-width: 768px) {
          .pro-sidebar { position: fixed; top: 0; left: -260px; height: 100vh; box-shadow: 4px 0 24px rgba(0,0,0,0.1); width: 260px; }
          .pro-sidebar.mobile-open { left: 0; }
          .pro-content-inner { padding: 20px; }
          .pro-page-title { font-size: 22px; }
          .pro-grid-2 { grid-template-columns: 1fr; gap: 0;}
          .pro-search-box input { min-width: 100px; }
          .pro-skeleton-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
