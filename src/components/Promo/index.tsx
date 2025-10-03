import styles from './styles.module.css'
import clsx from 'clsx'
import Link from "next/link";

type ButtonProps = {
    href: string,
    caption: string,
    className?: string
}

type PromoProps = {
    style?: React.CSSProperties,

    info?: string,
    title?: string,
    subtitle?: string,
    description?: string,
    buttons?: ButtonProps[],

    additionalContentNode?: React.ReactNode,

    childrenClassNames?: {
        container?: string,
        content?: string,
        title?: string,
        additionalContentNode?: string,
    }
}

export default function Promo(props: PromoProps) {
    const { style, info, title, subtitle, description, buttons = [], additionalContentNode, childrenClassNames } = props

    return (
        <>
            <div className={clsx('bs-flex-container', styles.container, childrenClassNames?.container)}>

                <div className={clsx(styles.content)} style={style}>
                    {info && (
                        <p className={clsx(styles.promoInfo)}>{info}</p>
                    )}
                    {title && (
                        <h1 className={clsx(styles.promoTitle, childrenClassNames?.title)}>{title}</h1>
                    )}
                    {subtitle && (
                        <h2>{subtitle}</h2>
                    )}
                    {description && (
                        <p className={clsx(styles.promoDesc)}>{description}</p>
                    )}
                    <div className={clsx(styles.promoButtons)}>
                        {buttons.length > 0 && (
                            buttons.map((btn, index) => (
                                <Link key={index} href={btn.href} title={btn.caption} className={clsx('button', btn.className)}>
                                    {btn.caption}
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {additionalContentNode && (
                    <div className={clsx(styles.promoAdd, childrenClassNames?.additionalContentNode)}>
                        {additionalContentNode}
                    </div>
                )}
            </div>
        </>
    )
}