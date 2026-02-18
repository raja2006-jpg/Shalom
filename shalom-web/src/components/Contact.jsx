"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [selectedProduct, setSelectedProduct] = useState(null);   // single (legacy)
  const [selectedProducts, setSelectedProducts] = useState([]);   // multi
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Multi-select (new)
      const multi = sessionStorage.getItem("selectedProducts");
      if (multi) {
        sessionStorage.removeItem("selectedProducts");
        setSelectedProducts(JSON.parse(multi));
        return;
      }
      // Single (legacy fallback)
      const single = sessionStorage.getItem("selectedProduct");
      if (single) {
        sessionStorage.removeItem("selectedProduct");
        setSelectedProduct(JSON.parse(single));
      }
    }
  }, []);

  /* helpers */
  const isMulti = selectedProducts.length > 0;
  const hasSelection = isMulti || selectedProduct !== null;

  function clearSelectedProduct() {
    setSelectedProduct(null);
    setSelectedProducts([]);
  }

  function removeOne(id) {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  }

  /* derived product name string for the form field */
  const productLabel = isMulti
    ? selectedProducts.map((p) => p.name).join(", ")
    : selectedProduct
    ? selectedProduct.name
    : "";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const inquiry = {
      name: e.target.cname.value,
      phone: e.target.cphone.value,
      product: productLabel || "Not selected",
      message: e.target.cmessage.value,
      // multi-product extras
      products: isMulti
        ? selectedProducts.map((p) => ({ name: p.name, price: p.price, image: p.image }))
        : selectedProduct
        ? [{ name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image }]
        : [],
      // legacy single-product fields
      image: isMulti ? (selectedProducts[0]?.image ?? "") : (selectedProduct?.image ?? ""),
      price: isMulti
        ? selectedProducts.map((p) => p.price).join(", ")
        : (selectedProduct?.price ?? ""),
    };

    try {
      const res = await fetch("https://shalom-kappa.vercel.app/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });

      if (!res.ok) throw new Error("Server error");

      setSuccess(true);
      setSelectedProduct(null);
      setSelectedProducts([]);

      setTimeout(() => {
        setSuccess(false);
        e.target.reset();
      }, 3000);
    } catch (err) {
      alert("❌ Failed to send inquiry. Check backend logs.");
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="reviews-title">Product Inquiry</h2>

      {/* ── Multi-product selected box ── */}
      {isMulti && (
        <div className="selected-product-box">
          <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>
            {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
          </p>

          <div className="multi-product-list">
            {selectedProducts.map((p) => (
              <div key={p.id} className="multi-product-item">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: "8px", border: "2px solid #5454535f" }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{p.name}</p>
                  <p style={{ color: "#8FBC36", fontWeight: 700, margin: 0 }}>₹{p.price}</p>
                </div>
                <button
                  className="remove-one-btn"
                  onClick={() => removeOne(p.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="contact-cancel" onClick={clearSelectedProduct}>
            Clear All
          </button>
        </div>
      )}

      {/* ── Single-product selected box (legacy) ── */}
      {!isMulti && selectedProduct && (
        <div className="selected-product-box">
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
              padding: "6px",
            }}
          >
            <Image
              src={selectedProduct.image}
              alt="Product"
              width={90}
              height={90}
              style={{ objectFit: "cover", borderRadius: "12px", border: "3px solid #5454535f" }}
            />
            <div>
              <p style={{ fontSize: "14px", color: "#666" }}>Product Selected</p>
              <h3>{selectedProduct.name}</h3>
              <p style={{ color: "#8FBC36", fontWeight: 700 }}>₹{selectedProduct.price}</p>
            </div>
          </div>
          <button className="contact-cancel" onClick={clearSelectedProduct}>
            cancel
          </button>
        </div>
      )}

      {/* ── Form / Success ── */}
      {!success ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="cname" placeholder="Your Name *" required />
          <input name="cphone" placeholder="Phone Number *" required />

          <input
            value={productLabel}
            placeholder="Selected Product"
            readOnly
            style={{ background: "#f5f5f5" }}
          />

          <textarea name="cmessage" placeholder="Your Message" />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>Your inquiry has been submitted successfully.</p>
        </div>
      )}

      {/* ── Inline styles ── */}
      <style jsx>{`
        .multi-product-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
          max-height: 260px;
          overflow-y: auto;
        }
        .multi-product-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: #fafafa;
          border-radius: 10px;
          border: 1px solid #eee;
        }
        .remove-one-btn {
          background: none;
          border: none;
          color: #aaa;
          font-size: 16px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 50%;
          transition: color 0.15s, background 0.15s;
        }
        .remove-one-btn:hover {
          color: #e74c3c;
          background: #ffeeed;
        }
        @media (max-width: 480px) {
          .multi-product-item {
            padding: 6px;
          }
        }
      `}</style>
    </section>
  );
}