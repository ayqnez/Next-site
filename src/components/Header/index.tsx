import Link from 'next/link'
import styles from '../../styles/Header/header.module.css'
import clsx from 'clsx'

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
                            <Link href={'/tasks'} className={clsx(styles.link)}>Tasks</Link>
                            <Link href={'/statistic'} className={clsx(styles.link)}>Statistic</Link>
                        </nav>
                    </div>

                    <div className={clsx(styles.headerButtons)}>
                        <Link
                            href={"/reg"}
                            className='button bg-purple color-white'
                        >
                            Sign up
                        </Link>
                        <Link
                            href={"/login"}
                            className='button'
                        >
                            Log in
                        </Link>
                    </div>
                </div>

            </header>
        </>
    )
}