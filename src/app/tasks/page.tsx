import pageStyles from "@/styles/pages/tasks/index.module.css"
import clsx from "clsx";
import Sidebar from "@/components/Sidebar";

export const metadata = {
    title: "Quickly | Tasks",
    description: "Your tasks",
}

export default function Index() {
    return (
        <>
            <div className={clsx('bg-light-grey')}>
                <Sidebar />
            </div>
        </>
    )
}