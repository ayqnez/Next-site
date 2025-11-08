"use client"

import { useEffect, useState } from "react"
import { useTasksStore } from "@/store/useTasksStore"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from "./styles.module.css"
import clsx from "clsx"

type AddTaskModalProps = {
    open: boolean
    onClose: () => void
}

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {
    const { createTask } = useTasksStore()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [category, setCategory] = useState("not_started")
    const [user_id, setUserID] = useState<number | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser)
                setUserID(user.id)
            } catch {
                console.error("Ошибка при чтении пользователя из localStorage")
            }
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !text.trim()) {
            return
        }

        if (!user_id) {
            console.error("Пользователь не найден")
            return
        }

        createTask({ title, text, category, user_id })
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={clsx(styles.container, 'bg-black color-white')}>
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>Enter task title, description and progress</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Textarea
                        placeholder="Task description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Select value={category} onValueChange={(v) => setCategory(v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="not_started">Not started</SelectItem>
                            <SelectItem value="in_progress">In progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <DialogFooter className={styles.actions}>
                        <button type="button" className="button bg-white color-black" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="button bg-purple color-white">
                            Save
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
