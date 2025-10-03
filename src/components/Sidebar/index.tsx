"use client"
import styles from './index.module.css'
import { FiLogOut, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {useState} from "react";
import clsx from "clsx";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={clsx(`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`, 'bg-dark color-white')}>

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
                                <p>ALL TASKS</p>
                                <p>COMPLETED</p>
                                <p>IN PROGRESS</p>
                                <p>NOT STARTED</p>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.footer}>
                        <button className={styles.logout}><FiLogOut /> Log out</button>
                        <button className={styles.settings}><FiSettings />Settings</button>
                    </div>
                </>
            ) : null }
        </div>
    );
}