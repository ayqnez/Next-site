"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null)

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    setError('Invalid username or password')
                }
                return;
            }

            router.push("/");
        } catch {

        }
    };

    return (
        <div className={clsx(styles.wrapper, 'bg-black')}>
            <form onSubmit={handleSubmit} className={clsx(styles.form, 'bg-black')}>
                <h3 className={clsx(styles.title, 'color-white')}>Login</h3>

                <input
                    className={clsx(styles.input)}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className='button bg-purple color-white'>
                    Login
                </button>

                {error && (
                    <p className="color-red" style={{ fontSize: "14px", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <p className='color-grey' style={{ fontSize: '14px', textAlign: 'center' }}>
                    Don't have an account?{" "}
                    <a href="/register" className={clsx(styles.link, 'color-purple')}>
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
