"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Header/header.module.css";
import clsx from "clsx";
import logo2 from "@/images/header/logo2.png"
import userlogo from "@/images/header/userlogo.png"
import { UserProps } from "../TaskItem";

export default function Header() {
    const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={clsx(styles.headerLogo, 'color-purple')}>
                        {/* <img src={logo2.src} alt="Logo" /> */}
                        Quickly
                    </Link>

                    <nav className={clsx(styles.headerLinks)}>
                        <Link href="/" className={clsx(styles.link)}>Home</Link>
                        <Link href="/tasks" className={clsx(styles.link)}>Tasks</Link>
                        <Link href="/statistic" className={clsx(styles.link)}>Statistic</Link>
                    </nav>
                </div>

                <div className={clsx(styles.headerButtons)}>
                    {user ? (
                        <>
                            <span className={clsx(styles.headerInfo, "color-dark-grey")}>
                                <img src={userlogo.src} alt="User Logo"/>
                                {user.username || "user" }
                            </span>
                            <button
                                onClick={handleLogout}
                                className="button sm bg-purple color-white"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/register" className="button bg-purple color-white">
                                Sign up
                            </Link>
                            <Link href="/login" className="button">
                                Log in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
