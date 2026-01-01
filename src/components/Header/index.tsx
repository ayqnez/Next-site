"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Header/header.module.css";
import clsx from "clsx";
import userlogo from "@/images/header/userlogo.png";
import { usePathname, useRouter } from "next/navigation";

export type UserProps = {
    id: Number,
    username: String,
    name: String,
    surname: String,
    email: String,
    role: String
}

type HeaderProps = {
    user?: UserProps | null
}

export default function Header(props: HeaderProps) {
    const { user } = props

    const [hidden, setHidden] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: 'POST'
        })

        router.refresh();
    };

    return (
        <header className={clsx(styles.header, hidden && styles.hidden)}>
            <div className={styles.headerContent}>
                <nav className={styles.headerLinks}>
                    <Link href="/" className={clsx(styles.link, pathname === "/" && styles.active)}>Home</Link>
                    <Link href="/recognize" className={clsx(styles.link, pathname === "/recognize" && styles.active)}>Recognize</Link>
                    <Link href="/statistic" className={clsx(styles.link, pathname === "/statistic" && styles.active)}>Statistic</Link>
                </nav>

                <div className={styles.headerButtons}>
                    <>
                        {user ? (
                            <>
                                <Link href='/profile' className="color-white">
                                    {user.name + " " + user.surname}
                                </Link>
                                <button className="button bg-purple color-white" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/register" className="button bg-purple color-white">
                                    Sign up
                                </Link>
                                <Link href="/login" className="button color-white">
                                    Log in
                                </Link></>
                        )}
                    </>
                </div>
            </div>
        </header>
    );
}
