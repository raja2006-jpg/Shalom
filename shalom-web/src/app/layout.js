import "../styles/globals.css";
import "../styles/admin.css";


export const metadata = {
  title: "Shalom System Solutions |  Laptop & Desktop Sales in Coimbatore ",
  description:
    "Shalom System Solutions offers laptop sales, desktop sales, Windows installation, antivirus setup, and hardware upgrades,Complete Software Solutions in one place ",
  keywords: [
    "IT solutions",
    "computer repair",
    "software installation",
    "laptop sales",
    "Coimbatore IT services"
  ],
  
  icons: {
    icon: "/mainlogos.png"            
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Inter:wght@400;500;600&display=swap"
    }
  ],
  verification:{
    google:"googlebe987d17fea3a253"
  }
  
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

