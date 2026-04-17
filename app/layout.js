export const metadata = {
  title: "Solvision Dentist",
  description: "General dentist in North Port Florida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
