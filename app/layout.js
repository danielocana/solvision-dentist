import "./globals.css";

export const metadata = {
  title: "Solvision Dentist | North Port, Florida",
  description:
    "Bilingual general dentistry in North Port, Florida. Preventive, restorative, and cosmetic dental care for the whole family.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
