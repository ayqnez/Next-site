"use client"
import styles from './index.module.css'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import clsx from "clsx";
import AddTaskModal from '../AddTaskModal';

type SidebarProps = {
    activeFilter: string,
    onSelect: (category: string) => void;
}

export default function Sidebar(props: SidebarProps) {
    const { activeFilter, onSelect } = props;
    const [isOpen, setIsOpen] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const handleClick = (category: string) => {
        onSelect(category);
    }

    return (
        <div className={clsx(`${styles.wrapper} ${isOpen ? styles.open : styles.closed}`, 'bg-black color-white')}>

            <div className={styles.header}>
                <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
                </button>
            </div>

            {isOpen ? (
                <>
                    <div className={styles.container}>
                        <div className={styles.section}>
                            <p className={clsx(styles.title, 'color-grey')}>MAIN MENU</p>
                            <ul className={styles.list}>
                                <li onClick={() => handleClick("dashboard")} className={activeFilter === "dashboard" ? styles.active : ''}>Dashboard</li>
                            </ul>
                        </div>

                        <div className={styles.section}>
                            {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className={clsx(styles.title, 'color-grey')}>TASKS</p>
                                <button className={clsx(styles.addBtn)} onClick={() => setShowModal(true)}>+</button>
                            </div>
                            <ul className={styles.list}>
                                <li onClick={() => handleClick("all")} className={activeFilter === "all" ? styles.active : ''}>All tasks</li>
                            </ul>

                        </div>

                        <div className={styles.section}>
                            <p className={clsx(styles.title, 'color-grey')}>Filter by: </p>
                            <ul className={clsx(styles.list)}>
                                <li onClick={() => handleClick("completed")} className={activeFilter === "completed" ? styles.active : ''}>Completed</li>
                                <li onClick={() => handleClick("in_progress")} className={activeFilter === "in_progress" ? styles.active : ''}>In progress</li>
                                <li onClick={() => handleClick("not_started")} className={activeFilter === "not_started" ? styles.active : ''}>Not started</li>
                            </ul>
                        </div>

                    </div>
                </>
            ) : null}
        </div>
    );
}