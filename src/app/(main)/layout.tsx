import Header from '@/components/Header'
import '../globals.css'
import '@/styles/styles.scss'

export const metadata = {
  title: "Next Site",
  description: "Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Header />
      <body style={{ marginTop: '68px' }}>
        {children}
      </body>
    </html>
  );
}
