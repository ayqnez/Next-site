import styles from './styles.module.css'

import Link from "next/link"
import clsx from "clsx";

type ButtonProps = {
    link: string,
    caption: string,
    childrenClassNames?: {
        background?: string
    }
}

export default function Button(props: ButtonProps) {
    const { link, caption, childrenClassNames } = props;

    return (
        <>
            <Link
                href={link}
                className={clsx(styles.button, childrenClassNames?.background)}
            >
                {caption}
            </Link>
        </>
    )
}