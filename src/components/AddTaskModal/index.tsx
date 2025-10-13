"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useTasksStore } from "@/store/useTasksStore";

type AddTaskModalProps = {
    onClose: () => void;
};

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
    const { createTask } = useTasksStore();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("not_started");
    const [user_id, setUserID] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserID(user.id);
            } catch {
                console.error("Ошибка при чтении пользователя из localStorage");
            }
        }

    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim || !text.trim) {
            return
        }

        createTask({ title, text, category, user_id })
        onClose();
    };

    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.container, "bg-black color-white")}>
                <h2>Add New Task</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Task description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="not_started">Not started</option>
                        <option value="in_progress">In progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={"bg-purple color-white"}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
