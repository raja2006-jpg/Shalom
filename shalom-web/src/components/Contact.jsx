"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [success, setSuccess] = useState(false);

  /* ================= LOAD FROM SESSION STORAGE ================= */
  useEffect(() => {
    // Only access sessionStorage on the client side
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("selectedProduct");
      if (saved) {
        sessionStorage.removeItem("selectedProduct");
        setSelectedProduct(JSON.parse(saved));
      }
    }
  }, []);

  /* ================= CLEAR PRODUCT ================= */
  function clearSelectedProduct() {
    setSelectedProduct(null);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    const inquiry = {
      name: e.target.cname.value,
      phone: e.target.cphone.value,
      product: selectedProduct ? selectedProduct.name : "Not selected",
      message: e.target.cmessage.value
    };

    await fetch("https://shalom-o8k7.onrender.com/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry)
    });

    setSuccess(true);
    setSelectedProduct(null);

    setTimeout(() => {
      setSuccess(false);
      e.target.reset();
    }, 3000);
  }

  return (
    <section id="contact" className="contact-section">
      {/* TITLE */}
      <h2 className="reviews-title">Product Inquiry</h2>

      {/* ================= SELECTED PRODUCT ================= */}
      {selectedProduct && (
        <div className="selected-product-box">
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center"
            }}
          >
            <Image
              src={selectedProduct.image}
              alt="Product"
              width={90}
              height={90}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #8fbc3653"
              }}
            />

            <div>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Product Selected
              </p>
              <h3>{selectedProduct.name}</h3>
              <p style={{ color: "#8FBC36", fontWeight: 700 }}>
                ₹{selectedProduct.price}
              </p>
            </div>
          </div>

          <button
            onClick={clearSelectedProduct}
            style={{
              background: "#e5383515",
              color: "#ff0101",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= FORM ================= */}
      {!success ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="cname" placeholder="Your Name *" required />
          <input name="cphone" placeholder="Phone Number *" required />
          <input
            value={selectedProduct ? selectedProduct.name : ""}
            placeholder="Selected Product"
            readOnly
            style={{ background: "#f5f5f5" }}
          />
          <textarea
            name="cmessage"
            placeholder="Your Message "
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <div className="success-message">
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>✓</div>
          <h3 style={{ color: "#4caf50", marginBottom: "5px" }}>
            Thank You!
          </h3>
          <p>
            Your inquiry has been submitted successfully. Our team will contact you soon!
          </p>
        </div>
      )}
    </section>
  );
}