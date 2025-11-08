"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import styles from "./styles.module.css"
import clsx from "clsx"

export default function CalendarView() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const handlePrevMonth = () => {
        if (date) {
            const prev = new Date(date)
            prev.setMonth(prev.getMonth() - 1)
            setDate(prev)
        }
    }

    const handleNextMonth = () => {
        if (date) {
            const next = new Date(date)
            next.setMonth(next.getMonth() + 1)
            setDate(next)
        }
    }

    return (
        <div className={clsx(styles.calendarContainer, 'bg-purple')}>
            <div className={styles.calendarHeader}>
                <h2 className={styles.monthText}>
                    {format(date || new Date(), "MMMM yyyy")}
                </h2>
                <div className={styles.navButtons}>
                    <button onClick={handlePrevMonth} className={styles.navBtn}>
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={handleNextMonth} className={styles.navBtn}>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={styles.calendar}
                classNames={{
                    day_selected: styles.daySelected,
                    day_today: styles.dayToday,
                    day: styles.day,
                }}
            />
        </div>
    )
}
