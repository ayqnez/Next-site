"use client"
import styles from './index.module.css'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {useState} from "react";
import clsx from "clsx";

type SidebarProps = {
    onSelect: (category: string) => void;
}

export default function Sidebar(props: SidebarProps) {
    const { onSelect } = props;
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = (category: string) => {
        if (onSelect) onSelect(category);
    }

    return (
        <div className={clsx(`${styles.wrapper} ${isOpen ? styles.open : styles.closed}`, 'bg-black color-white')}>

            <div className={styles.header}>
                <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
                </button>
            </div>

            { isOpen ? (
                <>
                    <div className={styles.container}>
                        <div className={styles.section}>
                            <p className={clsx(styles.title, 'color-grey')}>MAIN MENU</p>
                            <ul>
                                <p>Dashboard</p>
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <p className={clsx(styles.title, 'color-grey')}>TASKS</p>
                            <ul className={styles.list}>
                                <li onClick={() => handleClick("all")}>ALL TASKS</li>
                            </ul>

                        </div>

                        <div className={styles.section}>
                            <p className={clsx(styles.title, 'color-grey')}>Filter by: </p>
                            <ul className={clsx(styles.list)}>
                                <li onClick={() => handleClick("completed")}>COMPLETED</li>
                                <li onClick={() => handleClick("in_progress")}>IN PROGRESS</li>
                                <li onClick={() => handleClick("not_started")}>NOT STARTED</li>
                            </ul>
                        </div>

                    </div>
                </>
            ) : null }
        </div>
    );
}