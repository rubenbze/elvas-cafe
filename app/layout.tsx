import "./globals.css";

export const metadata = {
  title: "Elva's Cafe",
  description: "Luxury Boutique Cafe Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}