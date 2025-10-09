import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import clsx from "clsx";
import TaskDetailsModal from '../TaskDetailsModal';
import { useTasksStore } from '@/store/useTasksStore';

export type TaskItemProps = {
    id: number,
    title: string;
    text: string;
    category: string;
};

export default function TaskItem(props: TaskItemProps) {
    const { id, title, text, category } = props;

    const [menuOpen, setMenuOpen] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);

    const { deleteTask } = useTasksStore();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <>
            <div className={clsx(styles.wrapper, 'bg-light-black')}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.title)}>
                            <h3 className={'color-white'}>{title}</h3>

                            <div ref={menuRef}>
                                <button
                                    className={clsx(styles.moreButton, 'color-light-grey')}
                                    aria-label="More options"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    ⋯
                                </button>

                                {menuOpen && (
                                    <div className={clsx(styles.moreButtonMenu, 'bg-light-black')}>
                                        <button onClick={() => console.log("Edit clicked")} className='color-white'>Edit</button>
                                        <button onClick={() => setShowDetailsModal(true)} className='color-white'>View</button>
                                        <button onClick={() => deleteTask(id)} className='color-white'>Delete</button>
                                    </div>
                                )}

                                <TaskDetailsModal
                                    isOpen={showDetailsModal}
                                    onClose={() => setShowDetailsModal(false)}
                                    title={title}
                                    text={text}
                                    category={category}
                                />
                            </div>

                        </div>

                        <p className={'color-grey'}>
                            {text}
                        </p>
                    </div>

                    <div className={clsx(styles.category)}>
                        {category === "completed" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                Completed
                                <span className={clsx(styles.dot, styles.green)} />
                            </span>
                        )}
                        {category === "in_progress" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                In Progress
                                <span className={clsx(styles.dot, styles.blue)} />
                            </span>
                        )}
                        {category === "not_started" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                Not Started
                                <span className={clsx(styles.dot, styles.red)} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
