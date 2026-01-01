import React, { ReactNode } from "react"
import styles from './styles.module.css'
import clsx from "clsx";

type BackgroundImageProps = {
    src: string,
    tabletSrc?: string,
    mobileSrc?: string,
    children?: ReactNode,
    className?: string,
    bgClassName: string
}

export default function BackgroundImage(props: BackgroundImageProps) {
    const { src, tabletSrc, mobileSrc, children, className, bgClassName } = props;

    return (
        <div className={clsx(styles.wrapper)}>
            <picture>
                {mobileSrc && (
                    <source media="(max-width: 640px)" srcSet={mobileSrc} className={bgClassName}/>
                )}
                {tabletSrc && (
                    <source media="(max-width: 1024px)" srcSet={tabletSrc} className={bgClassName}/>
                )}
                <img src={src} alt="" className={clsx(styles.bg, bgClassName)} />
            </picture>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}