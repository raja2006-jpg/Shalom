import Image from 'next/image';

export default function Nav() {
  return (
    <div id="nav">
      <a id="logo" href="#">
        <Image src="/images/shalom.png" alt="Shalom Logo" width={200} height={50} />
      </a>
      <a href="#services">Services</a>
      <a href="/products">Products</a>
      <a href="#contact">Contact</a>
    </div>
  );
}
