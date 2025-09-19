import styles from './styles.module.css'
import clsx from 'clsx'
import Button from '../Button'

type ButtonProps = {
    href: string,
    caption: string,
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
        title?: string
    }
}

export default function Promo(props: PromoProps) {
    const { style, info, title, subtitle, description, buttons = [], additionalContentNode, childrenClassNames } = props

    return (
        <>
            <div className={clsx('bs-flex-container', styles.container)}>

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
                                <Button key={index} link={btn.href} caption={btn.caption} />
                            ))
                        )}
                    </div>
                </div>

                {additionalContentNode && (
                    additionalContentNode
                )}
            </div>
        </>
    )
}