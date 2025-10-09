"use client"

import pageStyles from "@/styles/pages/tasks/index.module.css"
import clsx from "clsx";
import Sidebar from "@/components/Sidebar";
import {TasksList} from "@/components/TasksList";
import { useState } from "react";


export default function Index() {
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <>
            <div className={clsx('bg-light-grey', pageStyles.tasksContainer)}>
                <Sidebar onSelect={setActiveFilter} activeFilter={activeFilter}/>
                <TasksList activeFilter={activeFilter} />
            </div>
        </>
    )
}