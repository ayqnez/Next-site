import styles from './styles.module.css'
import clsx from 'clsx'

type ButtonProps = {
    href: string,
    caption: string,
    className?: string
}

type SubscribeBannerProps = {
    title: string,
    subtitle: string,
    button: ButtonProps,
    icon: string,

    childrenClassNames?: {
        container?: string,
        title?: string,
        subtitle?: string,
    }
}

export const SubscribeBanner = (props: SubscribeBannerProps) => {
    const { title, subtitle, button, icon, childrenClassNames } = props

    return (
        <>
            <div className={clsx('bs-flex-container', styles.container, childrenClassNames?.container)}>
                <div className={styles.icon}>
                    <img src={icon} alt="" />
                </div>

                <h2 className={clsx(styles.title, childrenClassNames?.title)}>
                    {title}
                </h2>

                <p className={clsx(styles.subtitle, childrenClassNames?.subtitle)}>
                    {subtitle}
                </p>

                <div className={clsx(styles.form)}>
                    <input type="text" placeholder='Enter your email here...' className={styles.input}/>
                    <button className={clsx('button', button.className)}>
                        {button.caption}
                    </button>
                </div>
            </div>
        </>
    )
}