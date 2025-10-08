"use client";
import styles from './styles.module.css';
import { useTasksStore } from "@/store/useTasksStore";
import { useEffect } from "react";
import clsx from "clsx";
import findTask from "@/images/findTask.png"
import TaskItem, {TaskItemProps} from "@/components/TaskItem";

type TasksListProps = {
    activeFilter: string;
};

export function TasksList({activeFilter}: TasksListProps) {
    const {tasks, loading, error, fetchTasks, getTasksByStatus} = useTasksStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = getTasksByStatus(activeFilter);

    console.log(filteredTasks);

    if (loading) return (
        <div className={styles.handleErr}>
            <h2>Loading tasks...</h2>
        </div>
    );
    if (error) return (
        <div className={styles.handleErr}>
            <h2>Failed to fetch</h2>
        </div>
    );

    return (
        <div className={clsx(styles.container)}>
            {filteredTasks.length === 0 ? (
                <div className={styles.handleErr}>
                    <img src={findTask.src} alt=""/>
                    <h2>No tasks found for this filter.</h2>
                </div>
            ) : (
                <div className={clsx(styles.content)}>
                    {activeFilter === "all" && (
                        <h2>All Tasks: </h2>
                    )}
                    {activeFilter === "completed" && (
                        <h2>Completed Tasks: </h2>
                    )}
                    {activeFilter === "in_progress" && (
                        <h2>In progress Tasks: </h2>
                    )}
                    {activeFilter === "not_started" && (
                        <h2>Not started Tasks: </h2>
                    )}
                    <div className={styles.list}>
                        {filteredTasks.map((task : TaskItemProps, index : number)=> (
                            <TaskItem key={index} title={task.title} text={task.text} category={task.category} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
