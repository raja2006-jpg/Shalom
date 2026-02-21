"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const multi = sessionStorage.getItem("selectedProducts");
      if (multi) {
        sessionStorage.removeItem("selectedProducts");
        setSelectedProducts(JSON.parse(multi));
        return;
      }
      const single = sessionStorage.getItem("selectedProduct");
      if (single) {
        sessionStorage.removeItem("selectedProduct");
        setSelectedProduct(JSON.parse(single));
      }
    }
  }, []);

  const isMulti = selectedProducts.length > 0;
  const hasSelection = isMulti || selectedProduct !== null;

  function clearSelectedProduct() {
    setSelectedProduct(null);
    setSelectedProducts([]);
  }

  function removeOne(id) {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  }

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
      products: isMulti
        ? selectedProducts.map((p) => ({ name: p.name, price: p.price, image: p.image }))
        : selectedProduct
          ? [{ name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image }]
          : [],
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
          <p className="selected-count">
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
                  style={{ objectFit: "cover", borderRadius: "8px", border: "2px solid #e0e0e0" }}
                />
                <div className="multi-product-info">
                  <p className="multi-product-name">{p.name}</p>
                  <p className="multi-product-price">₹{p.price}</p>
                </div>
                <button
                  className="remove-one-btn"
                  onClick={() => removeOne(p.id)}
                  title="Remove"
                  aria-label={`Remove ${p.name}`}
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
          <div className="single-product-row">
            <Image
              src={selectedProduct.image}
              alt="Product"
              width={90}
              height={90}
              style={{ objectFit: "cover", borderRadius: "12px", border: "2px solid #e0e0e0" }}
            />
            <div>
              <p className="selected-count">Product Selected</p>
              <h3 className="single-product-name">{selectedProduct.name}</h3>
              <p className="multi-product-price">₹{selectedProduct.price}</p>
            </div>
          </div>
          <button className="contact-cancel" onClick={clearSelectedProduct}>
            Remove
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
          />

          <textarea name="cmessage" placeholder="Your Message" />

          <button type="submit" disabled={loading}>
            {loading ? "Sending…" : "Send Inquiry"}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>🎉 Thank You!</h3>
          <p>Your inquiry has been submitted successfully. We&rsquo;ll contact you shortly.</p>
        </div>
      )}
    </section>
  );
}