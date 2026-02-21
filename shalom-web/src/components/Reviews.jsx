import Image from 'next/image';

export default function Reviews() {
  const base1 = ["kalyan.png", "jerry.png", "prasath.png", "finance.png", "srihari.png"];
  const base2 = ["jerry.png", "finance.png", "prasath.png", "kalyan.png", "srihari.png"];

  // Triple so the marquee never shows a gap
  const row1 = [...base1, ...base1, ...base1];
  const row2 = [...base2, ...base2, ...base2];

  return (
    <section className="reviews-marquee" id="reviews">
      <h2 className="reviews-title">Our Customers&rsquo; Reviews</h2>

      <div className="marquee-row left">
        <div className="marquee-track">
          {row1.map((img, i) => (
            <div key={i} className="review-box">
              <Image src={`/images/${img}`} alt="Customer review" width={200} height={200} />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-row right">
        <div className="marquee-track">
          {row2.map((img, i) => (
            <div key={i} className="review-box">
              <Image src={`/images/${img}`} alt="Customer review" width={200} height={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
