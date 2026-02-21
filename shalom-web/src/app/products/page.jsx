"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-img" />
      <div className="card-body">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line skeleton-type" />
        <div className="skeleton skeleton-line skeleton-desc" />
        <div className="skeleton skeleton-line skeleton-desc short" />
        <div className="card-footer" style={{ marginTop: "18px" }}>
          <div className="skeleton skeleton-line skeleton-price" />
          <div className="skeleton skeleton-btn-ph" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectMode, setSelectMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const router = useRouter();

  /* ── FETCH ── */
  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("https://shalom-kappa.vercel.app/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    } catch {
      setError("Server not reachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ── SEARCH ── */
  function handleSearch(e) {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    setFiltered(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    );
  }

  /* ── TOGGLE SELECT MODE ── */
  function toggleSelectMode() {
    setSelectMode((prev) => !prev);
    setSelectedProducts([]);
  }

  /* ── TOGGLE CARD ── */
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

  /* ── SINGLE ENQUIRE ── */
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

  /* ── CONFIRM MULTI ── */
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
      {/* ── NAV ── */}
      <div id="nav">
        <Link id="logo" href="/">
          <Image src="/images/shalom.png" alt="Logo" width={50} height={50} />
        </Link>
        <nav className="nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/products" className="active">Products</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>

      {/* ── HERO ── */}
      <section className="products-hero">
        <h1>Our Products</h1>
        <p>Browse products and send an inquiry</p>
      </section>

      {/* ── SEARCH ── */}
      <div className="products-search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={handleSearch}
          disabled={loading}
        />
      </div>

      {/* ── TOOLBAR ── */}
      <div className="select-toolbar">
        <div>
          <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}></p>
          <button
            onClick={() => setSelectMode((p) => !p)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              borderRadius: "8px",
              border: `2px solid ${selectMode ? "#e74c3c" : "#8fbc36"}`,
              background: "transparent",
              color: selectMode ? "#e74c3c" : "#8fbc36",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: "15px" }}>{selectMode ? "✕" : "☑"}</span>
            {selectMode ? "Cancel" : "Select Multiple"}
          </button>
        </div>

        {selectMode && (
          <button
            className="toolbar-btn toolbar-btn--confirm"
            onClick={confirmSelection}
            disabled={selectedProducts.length === 0}
          >
            Confirm ({selectedProducts.length}) →
          </button>
        )}
      </div>

      {/* ── GRID ── */}
      <section className="products-wrapper">
        <div className="products-grid">

          {/* Skeleton cards while loading */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          }

          {/* Error state */}
          {!loading && error && (
            <p className="empty-text">⚠️ {error}</p>
          )}

          {/* Empty search result */}
          {!loading && !error && filtered.length === 0 && (
            <p className="empty-text">No products found.</p>
          )}

          {/* Product cards */}
          {!loading && !error &&
            filtered.map((product) => {
              const isSelected = !!selectedProducts.find((p) => p.id === product._id);

              return (
                <div
                  key={product._id}
                  className={`product-card${isSelected ? " card--selected" : ""}`}
                  onClick={() => selectMode && toggleSelect(product)}
                  style={{ cursor: selectMode ? "pointer" : "default" }}
                >
                  {/* Checkbox badge */}
                  {selectMode && (
                    <div className={`card-checkbox${isSelected ? " card-checkbox--checked" : ""}`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  )}

                  <Image src={product.image} alt={product.name} width={300} height={200} />

                  <div className="card-body">
                    <h3>{product.name}</h3>
                    <p className="type">{product.type}</p>
                    <p className="desc">{product.description}</p>

                    <div className="card-footer">
                      <span className="price">₹{product.price}</span>

                      {selectMode ? (
                        <button
                          className={`card-action-btn${isSelected ? " card-action-btn--deselect" : " card-action-btn--select"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(product);
                          }}
                        >
                          {isSelected ? "Deselect" : "Select"}
                        </button>
                      ) : (
                        <button
                          className="card-action-btn card-action-btn--enquire"
                          onClick={(e) => {
                            e.stopPropagation();
                            enquireSingle(product);
                          }}
                        >
                          Enquire →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ── FLOATING PILL ── */}
      {selectMode && selectedProducts.length > 0 && (
        <div className="floating-pill">
          <span>{selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected</span>
          <button onClick={confirmSelection}>Confirm →</button>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        /* Toolbar */
        .select-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px 4px;
          flex-wrap: wrap;
        }
        .toolbar-btn {
          padding: 9px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }
        .toolbar-btn--select {
          border-color: #8fbc36;
          background: transparent;
          color: #8fbc36;
        }
        .toolbar-btn--select:hover { background: #8fbc36; color: #fff; }
        .toolbar-btn--cancel { border-color: #ccc; background: #f5f5f5; color: #555; }
        .toolbar-btn--cancel:hover { background: #e8e8e8; }
        .toolbar-btn--confirm { background: #8fbc36; color: #fff; border-color: #8fbc36; }
        .toolbar-btn--confirm:disabled { opacity: 0.4; cursor: not-allowed; }
        .toolbar-btn--confirm:not(:disabled):hover { background: #7aaa28; }

        /* Card selected state */
        .card--selected {
          outline-offset: 2px;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(143, 188, 54, 0.25);
        }

        /* Checkbox badge */
        .card-checkbox {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2.5px solid #8fbc36;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.15s;
        }
        .card-checkbox--checked { background: #8fbc36; }

        /* Card action buttons */
        .card-action-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .card-action-btn:hover { opacity: 0.85; }
        .card-action-btn--enquire { background: #8fbc36; color: #fff; }
        .card-action-btn--select  { background: #8fbc36; color: #fff; }
        .card-action-btn--deselect{ background: #e74c3c; color: #fff; }

        /* Floating pill */
        .floating-pill {
          position: fixed;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          background: #dfdfdf43;
          backdrop-filter: blur(15px);
          color: #5e5e5eee;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 22px;
          border-radius: 15px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.39);
          z-index: 999;
          white-space: nowrap;
        }
        .floating-pill span { font-size: 14px; }
        .floating-pill button {
          background: #8fbc36;
          color: #fff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }
        .floating-pill button:hover { background: #7aaa28; }

        /* ── Skeleton loading ── */
        .skeleton-card {
          pointer-events: none;
          border: none !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
          overflow: hidden;
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #ececec 25%,
            #f8f8f8 50%,
            #ececec 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite ease-in-out;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-img {
          width: 100%;
          height: 200px;
          border-radius: 0;
          margin-bottom: 0;
        }

        .skeleton-line {
          height: 14px;
          margin-bottom: 10px;
          border-radius: 6px;
        }

        .skeleton-title  { width: 70%; height: 18px; margin-bottom: 12px; }
        .skeleton-type   { width: 40%; height: 12px; margin-bottom: 14px; }
        .skeleton-desc   { width: 100%; }
        .skeleton-desc.short { width: 65%; }
        .skeleton-price  { width: 30%; height: 20px; margin: 0; }

        .skeleton-btn-ph {
          width: 88px;
          height: 34px;
          border-radius: 6px;
          background: linear-gradient(90deg, #ececec 25%, #f8f8f8 50%, #ececec 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite ease-in-out;
        }

        @media (max-width: 480px) {
          .select-toolbar { padding: 10px 14px 4px; }
          .floating-pill {
            width: calc(100% - 28px);
            justify-content: space-between;
            bottom: 14px;
          }
          .skeleton-img { height: 160px; }
        }
      `}</style>
    </>
  );
}