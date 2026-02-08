"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("selectedProduct");
      if (saved) {
        sessionStorage.removeItem("selectedProduct");
        setSelectedProduct(JSON.parse(saved));
      }
    }
  }, []);

  function clearSelectedProduct() {
    setSelectedProduct(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // ✅ Added image and price here
    const inquiry = {
      name: e.target.cname.value,
      phone: e.target.cphone.value,
      product: selectedProduct ? selectedProduct.name : "Not selected",
      message: e.target.cmessage.value,
      image: selectedProduct ? selectedProduct.image : "",
      price: selectedProduct ? selectedProduct.price : ""
    };

    try {
      const res = await fetch(
        "https://shalom-o8k7.onrender.com/api/inquiries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiry)
        }
      );

      if (!res.ok) throw new Error("Server error");

      setSuccess(true);
      setSelectedProduct(null);

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

      {selectedProduct && (
        <div className="selected-product-box">
          <div style={{ display: "flex", gap: "16px", alignItems: "center" ,fontFamily:"Poppins', sans-serif",padding:"6px"}}>
            <Image
              src={selectedProduct.image}
              alt="Product"
              width={90}
              height={90}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                border: " 3px solid #5454535f",
               
                
              }}
               
             
            />

            <div >
              <p style={{ fontSize: "14px", color: "#666" }}>Product Selected</p>
              <h3>{selectedProduct.name}</h3>
              <p style={{ color: "#8FBC36", fontWeight: 700 }}>
                ₹{selectedProduct.price}
              </p>
            </div>
          </div>

          <button  className="contact-cancel" onClick={clearSelectedProduct}>cancel</button>
        </div>
      )}

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
    </section>
  );
}
