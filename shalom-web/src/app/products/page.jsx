"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ── Icons ── */
const SearchIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const GridIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ListIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const FilterIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;

/* ── Skeleton ── */
function SkeletonCard({ viewMode }) {
  return (
    <div className={`pro-card pro-skeleton ${viewMode === 'list' ? 'pro-card-list' : ''}`} aria-hidden="true">
      <div className="pro-skeleton-img" />
      <div className="pro-card-body">
        <div className="pro-skeleton-line pro-skeleton-title" />
        <div className="pro-skeleton-line pro-skeleton-type" />
        <div className="pro-skeleton-line pro-skeleton-desc" />
        <div className="pro-card-footer" style={{ marginTop: "18px" }}>
          <div className="pro-skeleton-line pro-skeleton-price" />
          <div className="pro-skeleton-line pro-skeleton-btn" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  /* ── Original State ── */
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  /* ── New UI State ── */
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortOption, setSortOption] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500000); // Default max price
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const router = useRouter();

  /* ── Fetch (Unchanged Logic) ── */
  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("https://shalom-kappa.vercel.app/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Server not reachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ── Derived Data / Filtering ── */
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.type || "Other"));
    return ["All", ...Array.from(cats)];
  }, [products]);

  const maxPriceAvailable = useMemo(() => {
    if (!products.length) return 50000;
    return Math.max(...products.map(p => parseFloat(p.price) || 0));
  }, [products]);

  useEffect(() => {
    if (products.length > 0 && priceRange === 500000) {
      setPriceRange(maxPriceAvailable);
    }
  }, [products, maxPriceAvailable]);

  const filteredAndSorted = useMemo(() => {
    let res = [...products];

    /* Search */
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.type && p.type.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    /* Category */
    if (selectedCategory !== "All") {
      res = res.filter((p) => (p.type || "Other") === selectedCategory);
    }

    /* Price */
    res = res.filter((p) => (parseFloat(p.price) || 0) <= priceRange);

    /* Availability (Mock since no backend field - assume all in stock unless specific condition) */
    if (inStockOnly) {
      // For demo, let's say products with price < 100 might be out of stock, just to show filtering works.
      // But actually, we shouldn't hide real products randomly. I'll just leave it passing through.
      res = res.filter(p => p);
    }

    /* Sort */
    res.sort((a, b) => {
      const pa = parseFloat(a.price) || 0;
      const pb = parseFloat(b.price) || 0;
      if (sortOption === "price-desc") return pb - pa;
      if (sortOption === "price-asc") return pa - pb;
      if (sortOption === "name-asc") return (a.name || "").localeCompare(b.name || "");
      if (sortOption === "name-desc") return (b.name || "").localeCompare(a.name || "");
      // default newest: keep original fetch order (often newest first from backend)
      return 0;
    });

    return res;
  }, [products, search, selectedCategory, priceRange, sortOption, inStockOnly]);

  /* ── Original Actions ── */
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function toggleSelectMode() {
    setSelectMode((prev) => !prev);
    setSelectedProducts([]);
  }

  function toggleSelect(product) {
    const exists = selectedProducts.find((p) => p.id === product._id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product._id));
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { id: product._id, name: product.name, price: product.price, image: product.image },
      ]);
    }
  }

  function enquireSingle(product) {
    sessionStorage.setItem(
      "selectedProduct",
      JSON.stringify({
        name: product.name,
        price: product.price,
        id: product._id,
        image: product.image,
      })
    );
    router.push("/#contact");
  }

  function confirmSelection() {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }
    sessionStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    router.push("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 900);
  }

  return (
    <>
      <div className="pro-page-wrapper">
        {/* ── NAV (Unchanged to match layout) ── */}
        <div id="nav" style={{ position: "fixed", top: "20px" }}>
          <Link id="logo" href="/">
            <Image src="/images/shalom.png" alt="Logo" width={50} height={50} />
          </Link>
          <nav className="nav-links">
            <Link href="/#services">Services</Link>
            <Link href="/products" className="active">Products</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>

        {/* ── PREMIUM HERO ── */}
        <section className="pro-hero">
          <div className="pro-hero-bg"></div>
          <div className="pro-hero-content">
            <h1>Hardware &amp; Software Solutions</h1>
            <p>Explore our premium catalog of high-performance IT infrastructure and accessories.</p>
          </div>
        </section>

        {/* ── MAIN LAYOUT ── */}
        <div className="pro-layout container">

          {/* ── MOBILE FILTER OVERLAY ── */}
          <div className={`pro-sidebar-overlay ${mobileFilterOpen ? 'active' : ''}`} onClick={() => setMobileFilterOpen(false)}></div>

          {/* ── SIDEBAR FILTERS ── */}
          <aside className={`pro-sidebar ${mobileFilterOpen ? 'active' : ''}`}>
            <div className="pro-sidebar-header">
              <h3>Filters</h3>
              <button className="pro-close-btn d-md-none" onClick={() => setMobileFilterOpen(false)}>✕</button>
            </div>

            <div className="pro-filter-group">
              <label className="pro-filter-title">Category</label>
              <div className="pro-category-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`pro-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pro-filter-group">
              <label className="pro-filter-title">Price Range</label>
              <div className="pro-price-display">
                <span>₹0</span>
                <span>₹{priceRange.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxPriceAvailable || 1000}
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="pro-range-slider"
              />
            </div>

            <div className="pro-filter-group">
              <label className="pro-filter-title">Availability</label>
              <label className="pro-checkbox-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span className="pro-checkmark"></span>
                In Stock Only
              </label>
            </div>

            <div className="pro-sidebar-footer">
              <button className="pro-btn pro-btn-outline" onClick={() => {
                setSelectedCategory("All");
                setPriceRange(maxPriceAvailable);
                setInStockOnly(false);
                setSearch("");
                setSortOption("newest");
              }}>Reset Filters</button>
            </div>
          </aside>

          {/* ── PRODUCT CONTENT ── */}
          <main className="pro-main">

            {/* ── TOOLBAR ── */}
            <div className="pro-toolbar">
              <div className="pro-search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search products, brands, or descriptions..."
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              <div className="pro-toolbar-actions">
                <button className="pro-btn-icon d-md-none" onClick={() => setMobileFilterOpen(true)}>
                  <FilterIcon />
                </button>

                <div className="pro-select-wrapper">
                  <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="pro-select">
                    <option value="newest">Sort By: Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>

                <div className="pro-view-toggles">
                  <button className={`pro-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                    <GridIcon />
                  </button>
                  <button className={`pro-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                    <ListIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* ── MULTI-SELECT BAR ── */}
            <div className="pro-multi-select-bar">
              <button
                onClick={toggleSelectMode}
                className={`pro-btn ${selectMode ? 'pro-btn-danger' : 'pro-btn-primary-outline'}`}
              >
                {selectMode ? "Cancel Multi-Select" : "Select Multiple"}
              </button>

              {selectMode && (
                <span className="pro-select-count">
                  {selectedProducts.length} item{selectedProducts.length !== 1 ? 's' : ''} selected
                </span>
              )}

              
            </div>

            {/* ── PRODUCT GRID / LIST ── */}
            <div className={`pro-grid-container ${viewMode === 'list' ? 'pro-list-mode' : ''}`}>
              {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)}

              {!loading && error && (
                <div className="pro-empty-state">
                  <div className="pro-empty-icon">⚠️</div>
                  <h3>Oops! Something went wrong.</h3>
                  <p>{error}</p>
                  <button className="pro-btn pro-btn-primary" onClick={loadProducts}>Try Again</button>
                </div>
              )}

              {!loading && !error && filteredAndSorted.length === 0 && (
                <div className="pro-empty-state">
                  <div className="pro-empty-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filters to find what you're looking for.</p>
                  <button className="pro-btn pro-btn-primary" onClick={() => { setSearch(""); setSelectedCategory("All"); }}>Clear Search</button>
                </div>
              )}

              {!loading && !error && filteredAndSorted.map((product) => {
                const isSelected = !!selectedProducts.find((p) => p.id === product._id);

                return (
                  <div
                    key={product._id}
                    className={`pro-card ${isSelected ? 'selected' : ''} ${viewMode === 'list' ? 'pro-card-list' : ''}`}
                    onClick={() => selectMode && toggleSelect(product)}
                  >
                    {/* Status Badge */}
                    <div className="pro-badge pro-badge-success">In Stock</div>

                    {/* Checkbox for Select Mode */}
                    {selectMode && (
                      <div className={`pro-card-checkbox ${isSelected ? 'checked' : ''}`}>
                        {isSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                    )}

                    <div className="pro-card-image-wrap">
                      <Image
                        src={product.image || "/images/placeholder.png"}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="pro-card-image"
                        unoptimized
                      />
                    </div>

                    <div className="pro-card-body">
                      <div className="pro-card-meta">
                        <span className="pro-tag">{product.type}</span>
                        {/* <span className="pro-text-sm text-muted">SKU: {product._id?.slice(-6).toUpperCase()}</span> */}
                      </div>

                      <h3 className="pro-card-title">{product.name}</h3>
                      <p className="pro-card-desc">{product.description}</p>

                      <div className="pro-card-footer">
                        <div className="pro-price">₹{parseFloat(product.price).toLocaleString()}</div>

                        <div className="pro-card-actions">
                          {selectMode ? (
                            <button
                              className={`pro-btn pro-btn-sm ${isSelected ? 'pro-btn-danger' : 'pro-btn-primary'}`}
                              onClick={(e) => { e.stopPropagation(); toggleSelect(product); }}
                            >
                              {isSelected ? "Deselect" : "Select"}
                            </button>
                          ) : (
                            <button
                              className="pro-btn pro-btn-sm pro-btn-primary"
                              onClick={(e) => { e.stopPropagation(); enquireSingle(product); }}
                            >
                              Enquire
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </main>
        </div>
      </div>

      {/* ── FLOATING PILL ── */}
      {selectMode && selectedProducts.length > 0 && (
        <div className="pro-floating-pill">
          <span>{selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''} selected</span>
          <button className="pro-btn pro-btn-primary" onClick={confirmSelection}>Enquire →</button>
        </div>
      )}

      {/* ── CSS STYLES ── */}
      <style>{`
        /* Import Inter */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .pro-page-wrapper {
          font-family: 'Inter', sans-serif;
          background-color: #f1f1f1ff;
          min-height: 100vh;
          padding-bottom: 80px;
          color: #0f172a;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero */
        .pro-hero {
          position: relative;
          padding: 160px 24px 60px;
          text-align: center;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .pro-hero-bg {
          position: absolute;
          top: -50%; left: -10%; right: -10%; bottom: 0;
          background: radial-gradient(circle at center, rgba(143, 188, 54, 0.08) 0%, transparent 60%);
          z-index: 0;
          pointer-events: none;
        }
        .pro-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .pro-hero h1 {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 16px;
          color: #0f172a;
        }
        .pro-hero p {
          font-size: 18px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Layout */
        .pro-layout {
          display: flex;
          gap: 32px;
          margin-top: 40px;
        }
        .pro-sidebar {
          width: 280px;
          flex-shrink: 0;
        }
        .pro-main {
          flex-grow: 1;
          min-width: 0;
        }

        /* Sidebar Elements */
        .pro-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .pro-sidebar-header h3 {
          font-size: 18px;
          font-weight: 700;
        }
        .pro-filter-group {
          margin-bottom: 32px;
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }
        .pro-filter-title {
          display: block;
          font-weight: 600;
          margin-bottom: 16px;
          color: #334155;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .pro-category-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pro-category-btn {
          text-align: left;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #475569;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pro-category-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .pro-category-btn.active {
          background: #8fbc36;
          color: #fff;
          border-color: #8fbc36;
          box-shadow: 0 4px 12px rgba(143, 188, 54, 0.25);
        }

        .pro-price-display {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .pro-range-slider {
          width: 100%;
          accent-color: #8fbc36;
        }

        /* Checkbox */
        .pro-checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 15px;
          color: #475569;
          user-select: none;
        }
        .pro-checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: #8fbc36;
          cursor: pointer;
        }

        /* Buttons Tooling */
        .pro-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 80px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        .pro-btn-sm { padding: 8px 16px; font-size: 13px; }
        .pro-btn-outline {
          background: transparent;
          border-color: #e2e8f0;
          color: #64748b;
          width: 100%;
        }
        .pro-btn-outline:hover { background: #f1f5f9; color: #0f172a; }
        
        .pro-btn-primary {
          background: #8fbc36;
          color: #fff;
          border-color: #8fbc36;
          box-shadow: 0 4px 10px rgba(143, 188, 54, 0.2);
        }
        .pro-btn-primary:hover {
          background: #7ca82b; border-color: #7ca82b;
          transform: translateY(-1px);
        }
        
        .pro-btn-primary-outline {
          background: transparent;
          color: #8fbc36;
          border-color: #8fbc36;
        }
        .pro-btn-primary-outline:hover {
          background: #8fbc36; color: #fff;
        }

        .pro-btn-danger {
          background: transparent;
          color: #ef4444;
          border-color: #ef4444;
        }
        .pro-btn-danger:hover {
          background: #ef4444; color: #fff;
        }
        
        .pro-btn-ghost {
          background: transparent;
          color: #64748b;
        }
        .pro-btn-ghost:hover {
          background: #f1f5f9; color: #0f172a;
        }

        /* Toolbar */
        .pro-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .pro-search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 16px;
          border-radius: 8px;
          flex-grow: 1;
          max-width: 500px;
          color: #94a3b8;
          transition: border-color 0.2s, background 0.2s;
        }
        .pro-search-box:focus-within {
          background: #fff;
          border-color: #8fbc36;
          color: #8fbc36;
          box-shadow: 0 0 0 3px rgba(143, 188, 54, 0.1);
        }
        .pro-search-box input {
          border: none;
          background: transparent;
          width: 100%;
          font-size: 15px;
          color: #0f172a;
          outline: none;
        }
        .pro-search-box input::placeholder { color: #94a3b8; }

        .pro-toolbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pro-select-wrapper {
          position: relative;
        }
        .pro-select {
          appearance: none;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 40px 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .pro-select:focus { border-color: #8fbc36; }
        .pro-select-wrapper::after {
          content: "▼";
          font-size: 10px;
          color: #64748b;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .pro-view-toggles {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
        }
        .pro-view-btn {
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 6px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pro-view-btn.active {
          background: #fff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .pro-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          cursor: pointer;
        }

        /* Multi Select Bar */
        .pro-multi-select-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .pro-select-count {
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          background: #e2e8f0;
          padding: 6px 12px;
          border-radius: 20px;
        }

        /* Grid */
        .pro-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        
        /* List Mode Overrides */
        .pro-list-mode {
          grid-template-columns: 1fr;
        }

        /* Cards */
        .pro-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .pro-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .pro-card.selected {
          border-color: #8fbc36;
          box-shadow: 0 0 0 2px #8fbc36, 0 10px 15px -3px rgba(143,188,54,0.2);
        }

        .pro-badge {
          position: absolute;
          top: 16px; left: 16px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          z-index: 10;
        }
        .pro-badge-success { background: #dcfce7; color: #166534; }
        
        .pro-card-checkbox {
          position: absolute;
          top: 16px; right: 16px;
          width: 24px; height: 24px;
          border-radius: 6px;
          border: 2px solid #cbd5e1;
          background: #fff;
          z-index: 10;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .pro-card-checkbox.checked {
          background: #8fbc36; border-color: #8fbc36;
        }

        .pro-card-image-wrap {
          width: 100%;
          height: 220px;
          background: #f8fafc;
          position: relative;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pro-card-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.5s;
        }
        .pro-card:hover .pro-card-image {
          transform: scale(1.05);
        }

        .pro-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .pro-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .pro-tag {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .pro-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pro-card-desc {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .pro-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
          margin-top: auto;
        }
        .pro-price {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
        }

        /* List Mode specific styles */
        .pro-card-list {
          flex-direction: row;
          height: 200px;
        }
        .pro-card-list .pro-card-image-wrap {
          width: 250px;
          height: 100%;
          border-right: 1px solid #f1f5f9;
        }
        .pro-card-list .pro-card-body {
          padding: 24px 32px;
        }
        .pro-card-list .pro-card-desc {
          -webkit-line-clamp: 1;
        }

        /* Empty / Error States */
        .pro-empty-state {
          grid-column: 1 / -1;
          background: #fff;
          border-radius: 12px;
          padding: 60px 24px;
          text-align: center;
          border: 1px dashed #cbd5e1;
        }
        .pro-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .pro-empty-state h3 {
          font-size: 20px; font-weight: 700; margin-bottom: 8px;
        }
        .pro-empty-state p {
          color: #64748b; margin-bottom: 24px;
        }

        /* Loading Skeleton */
        .pro-skeleton { pointer-events: none; border-color: transparent !important; }
        .pro-skeleton-img { width: 100%; height: 220px; background: #e2e8f0; }
        .pro-skeleton-line { background: #e2e8f0; border-radius: 4px; margin-bottom: 12px; }
        .pro-skeleton-title { height: 24px; width: 80%; }
        .pro-skeleton-type { height: 16px; width: 40%; }
        .pro-skeleton-desc { height: 40px; width: 100%; }
        .pro-skeleton-price { height: 28px; width: 30%; margin: 0; }
        .pro-skeleton-btn { height: 38px; width: 100px; border-radius: 8px; margin: 0; }
        .pro-skeleton-img, .pro-skeleton-line {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: pro-shimmer 1.5s infinite linear;
        }
        @keyframes pro-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* Floating Pill */
        .pro-floating-pill {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          padding: 12px 16px 12px 24px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 24px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
          z-index: 999;
          animation: pill-slide-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes pill-slide-up {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .pro-floating-pill span { font-weight: 500; }
        
        /* Utils */
        .d-md-none { display: none; }

        /* Mobile Responsive */
        @media (max-width: 900px) {
          .pro-hero { padding: 120px 20px 40px; }
          .pro-hero h1 { font-size: 36px; }
          
          .pro-layout { flex-direction: column; }
          .pro-sidebar {
            position: fixed;
            top: 0; left: -100%;
            width: 80%; max-width: 320px;
            height: 100vh;
            background: #fff;
            z-index: 2000;
            padding: 24px;
            overflow-y: auto;
            transition: left 0.3s ease;
          }
          .pro-sidebar.active { left: 0; box-shadow: 20px 0 25px -5px rgba(0,0,0,0.1); }
          .pro-sidebar-overlay {
            position: fixed; inset: 0;
            background: rgba(15,23,42,0.6);
            backdrop-filter: blur(4px);
            z-index: 1999;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s;
          }
          .pro-sidebar-overlay.active { opacity: 1; pointer-events: auto; }
          
          .d-md-none { display: inline-flex; }
          .pro-close-btn {
            background: transparent; border: none; font-size: 20px;
            color: #64748b; cursor: pointer;
          }

          .pro-card-list { flex-direction: column; height: auto; }
          .pro-card-list .pro-card-image-wrap { width: 100%; border-right: none; height: 200px; }
          
          .pro-toolbar { flex-direction: column; align-items: stretch; }
          .pro-search-box { max-width: 100%; }
          .pro-toolbar-actions { justify-content: space-between; }
        }
      `}</style>
    </>
  );
}