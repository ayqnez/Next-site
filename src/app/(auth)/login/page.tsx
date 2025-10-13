"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useTasksStore } from "@/store/useTasksStore";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useTasksStore();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = await loginUser({ username, password });
        if (user && user.id) {
            router.push("/");
        } else {
            alert("Неверное имя пользователя или пароль");
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
