"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useTasksStore } from "@/store/useTasksStore";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { registerUser } = useTasksStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = await registerUser({ username, password });

        if (newUser && newUser.id) {
            router.push("/login");
        } else {
            alert("Ошибка при регистрации");
        }
    };


    return (
        <div className={clsx(styles.wrapper, 'bg-black')}>
            <form onSubmit={handleSubmit} className={clsx(styles.form, 'bg-black')}>
                <h3 className={clsx(styles.title, 'color-white')}>Register</h3  >

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
                    Register
                </button>

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
