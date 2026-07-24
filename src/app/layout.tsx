import "./globals.css";

export const metadata = {
  title: "HireHub - AI Recruiter",
  description: "Autonomous Candidate Sourcing & Evaluation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
