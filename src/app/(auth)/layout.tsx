import '../globals.css'
import '@/styles/styles.scss'

export const metadata = {
    title: "Next Site",
    description: "Next.js",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
