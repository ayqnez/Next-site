import styles from "./styles.module.css";
import clsx from "clsx";

export type TabsProps = "photo" | "realtime";

type Props = {
    value: TabsProps;
    onChange: (mode: TabsProps) => void;
};

export default function Tabs({ value, onChange }: Props) {
    return (
        <div className={styles.tabs}>
            <button
                className={clsx(clsx(styles.tab, 'color-purple-light'), value === "photo" && clsx(styles.active, 'color-purple'))}
                onClick={() => onChange("photo")}
            >
                Scan by photo
            </button>

            <button
                className={clsx(clsx(styles.tab, 'color-purple-light'), value === "realtime" && clsx(styles.active, 'color-purple'))}
                onClick={() => onChange("realtime")}
            >
                Real-time scan
            </button>
        </div>
    );
}
