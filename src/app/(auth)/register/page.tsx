"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = { username, name, surname, email, password };

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    setError('Try again')
                }
                return;
            }

            router.push("/login");
        } catch {

        }
    };

    return (
        <div className={clsx(styles.wrapper, 'bg-black')}>
            <form onSubmit={handleSubmit} className={clsx(styles.form, 'bg-black')}>
                <h3 className={clsx(styles.title, 'color-white')}>Register</h3  >

                <input
                    className={clsx(styles.input)}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className={clsx(styles.input)}
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    className={clsx(styles.input)}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={clsx(styles.input)}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Register
                </button>

                {error && (
                    <p className="color-red" style={{ fontSize: "14px", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <p className='color-grey' style={{ fontSize: '14px', textAlign: 'center' }}>
                    Do you have an account?{" "}
                    <a href="/login" className={clsx(styles.link, 'color-purple')}>
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
