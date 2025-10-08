import styles from './styles.module.css'
import clsx from "clsx";

export type TaskItemProps = {
    title: string;
    text: string;
    category: string;
};

export default function TaskItem(props : TaskItemProps) {
    const { title, text, category } = props;

    return (
        <>
            <div className={clsx(styles.wrapper, 'bg-light-black')}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.title)}>
                            <h3 className={'color-white'}>{title}</h3>

                            <button
                                className={clsx(styles.moreButton, 'color-light-grey')}
                                aria-label="More options"
                                onClick={() => console.log('More clicked')}
                            >
                                ⋯
                            </button>
                        </div>
                        <p className={'color-grey'}>{text}</p>
                    </div>

                    <div className={clsx(styles.category)}>
                        {category === "completed" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                Completed
                                <span className={clsx(styles.dot, styles.green)} />
                            </span>
                        )}
                        {category === "in_progress" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                In Progress
                                <span className={clsx(styles.dot, styles.blue)} />
                            </span>
                        )}
                        {category === "not_started" && (
                            <span className={clsx('bg-purple color-white', styles.badge)}>
                                Not Started
                                <span className={clsx(styles.dot, styles.red)} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
