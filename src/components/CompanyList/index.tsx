import clsx from 'clsx'
import styles from './styles.module.css'
import { CSSProperties } from 'react'

type CompanyListProps = {
    title?: string,
    subtitle?: string,
    companySrc: string,
    style?: CSSProperties

    childrenClassNames?: {
        container?: string
        title?: string,
        subtitle?: string
    }
}

export default function CompanyList(props: CompanyListProps) {
    const { title, subtitle, companySrc, childrenClassNames, style } = props

    return (
        <>
            <div className={clsx(styles.container, childrenClassNames?.container)} style={style}>
                <div className={styles.content}>
                    {title && (
                        <h1 className={clsx(childrenClassNames?.title)}>
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <h3 className={clsx(styles.subtitle, childrenClassNames?.subtitle)}>
                            {subtitle}
                        </h3>
                    )}
                </div>
                <div className={styles.companyContainer}>
                    <img src={companySrc} alt="Company img" />
                </div>
            </div>
        </>
    )
}