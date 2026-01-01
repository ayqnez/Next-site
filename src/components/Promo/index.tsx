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
    title?: string | React.ReactNode
    subtitle?: string,
    description?: string,
    buttons?: ButtonProps[],

    additionalContentNode?: React.ReactNode,

    childrenClassNames?: {
        container?: string,
        content?: string,
        info?: string,
        title?: string,
        subtitle?: string,
        description?: string,
        buttons?: string,
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
                        <div className={clsx(styles.promoInfo, childrenClassNames?.info)}>{info}</div>
                    )}
                    {title && (
                        <div className={clsx(styles.promoTitle, childrenClassNames?.title)}>{title}</div>
                    )}
                    {subtitle && (
                        <div className={clsx(styles.promoSubtitle, childrenClassNames?.subtitle)}>{subtitle}</div>
                    )}
                    {description && (
                        <div className={clsx(styles.promoDesc, childrenClassNames?.description)}>{description}</div>
                    )}
                    <div className={clsx(styles.promoButtons, childrenClassNames?.buttons)}>
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