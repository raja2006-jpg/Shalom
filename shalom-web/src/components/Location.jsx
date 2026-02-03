import Image from 'next/image';

export default function Location() {
  return (
    <section className="company-location" id="location">
      <h2 className="reviews-title">our company address</h2>

      <div className="location-container">
        {/* LEFT : COMPANY INFO */}
        <div className="company-info">
          <Image
            src="/images/shalom.png"
            alt="Shalom System Solutions"
            className="company-logo"
            width={200}
            height={200}
          />

          <h2>System Solutions</h2>
          <p className="company-tagline">Computer Service & IT Solutions</p>

          <div className="company-details">
            <p>
              <strong>📍 Address:</strong>
              <br />
              3 RD Jeeva Nagar, Kannampalayam,
              <br />
              Jeevanagar 3rd Street,
              <br />
              Sulur, Coimbatore – 641402,
              <br />
              Tamil Nadu, India
            </p>

            <p>
              <strong>🏢 Category:</strong>
              <br />
              Computer Sales & Service
            </p>

            <p>
              <strong>📞 Contact:</strong>
              <br />
              +91 96296 27339
            </p>
          </div>
        </div>

        {/* RIGHT : MAP + GALLERY */}
        <div className="map-gallery-wrapper">
          {/* MAP IMAGE */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Shalom+System+Solutions+Kannampalayam+Sulur"
            target="_blank"
            rel="noopener noreferrer"
            className="map-box"
          >
            <Image
              src="/images/map.png"
              alt="Shalom System Solutions Location Map"
              width={400}
              height={300}
            />
            <div className="map-overlay">
              <span>View on Google Maps</span>
            </div>
          </a>

          {/* GALLERY UNDER MAP */}
          <div className="map-gallery">
            <div
              className="gallery-item"
              onClick={() => (window.location.href = "/products")}
            >
              <Image
                src="/images/company 1.webp"
                alt="Work Image 1"
                width={300}
                height={200}
              />
            </div>

            <div className="gallery-item">
              <Image
                src="/images/company 2.webp"
                alt="Work Image 2"
                width={300}
                height={200}
              />
            </div>

            <div className="gallery-item">
              <Image
                src="/images/company 3.webp"
                alt="Work Image 3"
                width={300}
                height={200}
              />
            </div>

            <div className="gallery-item">
              <Image
                src="/images/company 4.webp"
                alt="Work Image 4"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
