import Link from 'next/link'
import styles from '../../styles/Header/header.module.css'
import clsx from 'clsx'

import Button from '../Button'

export default function Header() {
    return (
        <>
            <header className={styles.header}>

                <div className={styles.headerContent}>

                    <div className={styles.headerLeft}>
                        <div className={clsx(styles.headerLogo)}>
                            Quickly
                        </div>

                        <nav className={clsx(styles.headerLinks)}>
                            <Link href={'/'} className={clsx(styles.link, 'text')}>Home</Link>
                            <Link href={'/tasks'} className={clsx(styles.link)}>About</Link>
                            <Link href={'/Statistic'} className={clsx(styles.link)}>Statistic</Link>
                        </nav>
                    </div>

                    <div className={clsx(styles.headerButtons)}>
                        <Button link='/reg' caption='Sign Up' />
                        <Button link='/login' caption='Log In' />
                    </div>
                </div>

            </header>
        </>
    )
}