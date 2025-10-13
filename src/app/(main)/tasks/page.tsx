import clsx from "clsx";
import { TasksList } from "@/components/TasksList";

export const metadata = {
    title: "Quickly | Tasks page",
    description: "Tasks page",
}

export default function Index() {

    return (
        <>
            <div className={clsx('bg-light-grey')}>
                <TasksList />
            </div>
        </>
    )
}