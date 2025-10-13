"use client";
import styles from "./styles.module.css";
import { useTasksStore } from "@/store/useTasksStore";
import { useEffect, useState } from "react";
import clsx from "clsx";
import findTask from "@/images/findTask.png";
import TaskItem, { TaskItemProps, UserProps } from "@/components/TaskItem";
import AddTaskModal from "../AddTaskModal";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";

export function TasksList() {
    const [activeFilter, setActiveFilter] = useState("dashboard");

    const { tasks, loading, error, fetchTasks, getTasksByStatus } = useTasksStore();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUser(user);
            } catch {
                console.error("Ошибка при чтении пользователя из localStorage");
            }
        }

        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = getTasksByStatus(activeFilter).filter((task: TaskItemProps) => task.user_id === user?.id)

    if (loading)
        return (
            <div className={styles.handleErr}>
                <h2>Loading tasks...</h2>
            </div>
        );

    if (error)
        return (
            <div className={styles.handleErr}>
                <h2>Failed to fetch tasks</h2>
            </div>
        );

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar onSelect={setActiveFilter} activeFilter={activeFilter} />

                <div className={clsx(styles.container)}>
                    {activeFilter === "dashboard" ? (
                        <Dashboard />
                    ) : user == null ? (
                        <div className={styles.handleErr}>
                            <img src={findTask.src} alt="No tasks" />
                            <h2>You need to login</h2>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className={styles.handleErr}>
                            <img src={findTask.src} alt="No tasks" />
                            <h2>No tasks found for this filter.</h2>
                        </div>
                    ) : (
                        <div className={clsx(styles.content)}>
                            {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2>
                                    {{
                                        all: "All Tasks:",
                                        completed: "Completed Tasks:",
                                        in_progress: "In Progress Tasks:",
                                        not_started: "Not Started Tasks:",
                                    }[activeFilter]}
                                </h2>

                                <button
                                    className="button sm bg-purple color-white"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add new task
                                </button>
                            </div>

                            <div className={styles.list}>
                                {filteredTasks.map((task: TaskItemProps) => (
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        text={task.text}
                                        category={task.category}
                                        user_id={user?.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}
