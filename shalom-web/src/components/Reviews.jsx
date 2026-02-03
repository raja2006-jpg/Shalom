import Image from 'next/image';

export default function Reviews() {
  const row1 = [
    "kalyan.png",
    "jerry.png",
    "prasath.png",
    "finance.png",
    "srihari.png",
    "finance.png",
    "jerry.png",
    "prasath.png",
    "srihari.png",
    "kalyan.png"
  ];

  const row2 = [
    "jerry.png",
    "finance.png",
    "prasath.png",
    "kalyan.png",
    "srihari.png",
    "prasath.png",
    "jerry.png",
    "finance.png",
    "srihari.png",
    "kalyan.png"
  ];

  return (
    <section className="reviews-marquee" id="reviews">
      <h2 className="reviews-title">our customers reviews</h2>

      <div className="marquee-row left">
        <div className="marquee-track">
          {row1.map((img, i) => (
            <div key={i} className="review-box">
              <Image src={`/images/${img}`} alt="Review" width={200} height={200} />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-row right">
        <div className="marquee-track">
          {row2.map((img, i) => (
            <div key={i} className="review-box">
              <Image src={`/images/${img}`} alt="Review" width={200} height={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
