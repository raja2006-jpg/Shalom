import "../styles/globals.css";
import "../styles/admin.css";

export const metadata = {
  title: "Shalom | System Solutions",
  description:
    "Shalom System Solutions - Complete Hardware & Software Solutions with High Quality Services",
  keywords: [
    "IT solutions",
    "computer repair",
    "software installation",
    "laptop sales",
    "Coimbatore IT services"
  ],
  icons: {
    icon: "/mainlogos.png"   // site logo (favicon)
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

