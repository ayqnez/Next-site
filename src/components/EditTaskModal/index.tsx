"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useTasksStore } from "@/store/useTasksStore";
import clsx from "clsx";

type EditTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;

    id: number;
    title: string;
    text: string;
    category: string;

};

export default function EditTaskModal({ isOpen, onClose, id, title, text, category }: EditTaskModalProps) {
    const { editTask } = useTasksStore();

    const [newTitle, setNewTitle] = useState(title);
    const [newText, setNewText] = useState(text);
    const [newCategory, setNewCategory] = useState(category);

    if (!isOpen) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await editTask(id, {
            title: newTitle,
            text: newText,
            category: newCategory,
        });
        onClose();
    };

    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.container, 'bg-black color-white')}>
                <form onSubmit={handleSave} className={styles.form}>
                    <h2>Edit Task</h2>

                    <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Description"
                    />

                    <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    >
                        <option value="completed">Completed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="not_started">Not Started</option>
                    </select>

                    <div className={styles.actions}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
