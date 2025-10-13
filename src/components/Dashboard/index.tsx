import clsx from 'clsx'
import styles from './styles.module.css'

import human from '@/images/human.png'

export default function Dashboard() {
    return (
        <>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.bannerContainer)}>
                    <div className={clsx(styles.bannerContent)}>
                        <p className='color-grey'>Welcome to</p>
                        <h3 style={{ fontWeight: '500' }}>Your Task Manager Area</h3>
                        <p>Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent.</p>
                        <button className='button bg-purple color-white'>Learn more</button>
                    </div>
                    <div className={clsx(styles.bannerImg)}>
                        <img src={human.src} alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}