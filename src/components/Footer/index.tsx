import clsx from 'clsx'
import Promo from '../Promo'
import styles from './styles.module.css'

export default function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerTop}>
                    <Promo
                        style={{ maxWidth: '560px' }}
                        title={<>On Sale for a  <br /><span className='color-black' style={{ fontWeight: '700' }}>very limited time</span></>}
                        description='Join us today and experience the power of AI-powered site creation for yourself!'

                        childrenClassNames={{
                            container: clsx(styles.container)
                        }}
                    />
                </div>
                <div className={styles.footerBottom}>
                    <span className={styles.footerText}>Made with in Kazakhstan</span>
                </div>
            </footer>
        </>
    )
}