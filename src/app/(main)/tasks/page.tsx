import clsx from "clsx";
import { TasksPage } from "@/components/TasksPage";

export const metadata = {
    title: "Quickly | Tasks page",
    description: "Tasks page",
}

export default function Index() {

    return (
        <>
            <div className={clsx('bg-light-grey')}>
                <TasksPage />
            </div>
        </>
    )
}