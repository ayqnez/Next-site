import clsx from 'clsx';
import styles from './styles.module.css'

type TaskDetailsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    text: string;
    category: string;
};

export default function TaskDetailsModal(props: TaskDetailsModalProps) {
    const { isOpen, onClose, title, text, category } = props;

    if (!isOpen) return null;

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container, "bg-black color-white")}>
                <h1 className='color-grey'>Task Details</h1>

                <div className={clsx(styles.content)}>
                    <h2>Title: {title}</h2>

                    <p>Description: {text}</p>
                </div>

                <div className={styles.actions}>
                    <button className="button bg-purple color-white" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}