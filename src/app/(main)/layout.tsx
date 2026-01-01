import '../globals.css'
import '@/styles/styles.scss'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';

export const metadata = {
  title: "Next Site",
  description: "Next.js",
};

async function getCurrentUser() {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
