"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  /* ================= FETCH PRODUCTS ================= */
  async function loadProducts() {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    } catch {
      setError("Server not reachable");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= SEARCH ================= */
  function handleSearch(e) {
    const q = e.target.value.toLowerCase();
    setSearch(q);

    setFiltered(
      products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    );
  }

  /* ================= SELECT PRODUCT ================= */
  function selectProduct(product) {
    sessionStorage.setItem(
      "selectedProduct",
      JSON.stringify({
        name: product.name,
        price: product.price,
        id: product._id,
        image: product.image
      })
    );

    // Navigate to home + contact section
    router.push("/#contact");
  }

  return (
    <>
      {/* ================= NAV ================= */}
      <div id="nav">
        <Link id="logo" href="/">
          <Image
            src="/images/shalom.png"
            alt="Shalom Logo"
            width={50}
            height={50}
          />
        </Link>

        <Link href="/#services">Services</Link>
        <Link href="/products" className="active">
          Products
        </Link>
        <Link href="/#contact">Contact</Link>
      </div>

      {/* ================= HEADER ================= */}
      <section className="products-hero">
        <h1>Our Products</h1>
        <p>Browse available products and send an inquiry instantly</p>
      </section>

      {/* ================= SEARCH ================= */}
      <div className="products-search-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="products-wrapper">
        <div className="products-grid">
          {error && <p className="empty-text">{error}</p>}

          {!error && filtered.length === 0 && (
            <p className="empty-text">No products available</p>
          )}

          {!error &&
            filtered.map(product => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => selectProduct(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                />

                <div className="card-body">
                  <h3>{product.name}</h3>
                  <p className="type">{product.type}</p>
                  <p className="desc">{product.description}</p>

                  <div className="card-footer">
                    <span className="price">₹{product.price}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        selectProduct(product);
                      }}
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
