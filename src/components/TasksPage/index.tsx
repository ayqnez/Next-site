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
import { Spinner } from "../ui/spinner";

type HandleErrProps = {
    errMessage: string,
    img: {
        imgSrc: string,
        alt?: string
    }
}

export function HandleErr(props: HandleErrProps) {
    const { errMessage, img } = props

    return (
        <div className={styles.handleErr}>
            <img src={img.imgSrc} alt={img.alt} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Spinner className="size-8"/>
                <h2>{errMessage}</h2>
            </div>
        </div>
    )
}

export function TasksPage() {
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

    const filteredTasks = getTasksByStatus(activeFilter).filter(
        (task: TaskItemProps) => task.user_id === user?.id
    );

    return (
        <div style={{ display: "flex" }}>
            <Sidebar onSelect={setActiveFilter} activeFilter={activeFilter} />

            <div className={clsx(styles.container)}>
                {loading && activeFilter !== "dashboard" ? (
                    <HandleErr errMessage="Loading tasks..." img={{ imgSrc: findTask.src, alt: 'Loading' }} />
                ) : error ? (
                    <HandleErr errMessage="Failed to fetch tasks" img={{ imgSrc: findTask.src, alt: 'Failed Fetch' }} />
                ) : activeFilter === "dashboard" ? (
                    <Dashboard />
                ) : user == null ? (
                    <HandleErr errMessage="You need to login" img={{ imgSrc: findTask.src, alt: 'Login' }} />
                ) : filteredTasks.length === 0 ? (
                    <HandleErr errMessage="No tasks found for this filter." img={{ imgSrc: findTask.src, alt: 'No tasks' }} />
                ) : (
                    <div className={clsx(styles.content)}>
                        <AddTaskModal open={showModal} onClose={() => setShowModal(false)} />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
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
        </div>
    );
}
