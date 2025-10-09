import { create } from "zustand";

const API_URL = "http://localhost:8080";

export const useTasksStore = create((set, get) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
            const data = await res.json();
            set({ tasks: data, loading: false });
        } catch (err) {
            
        }
    },

    createTask: async (newTask) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_URL}/task`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask)
            })
            if (res.ok) {
                const createdTask = await res.json();
                set((state) => ({
                    tasks: [...state.tasks, createdTask],
                    loading: false
                }))
            }
        } catch (err) {

        }
    },

    editTask: async (taskId, updatedData) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_URL}/task/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData)
            })
            if (res.ok) {
                const updatedTask = await res.json();
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId ? updatedTask : task
                    ),
                    loading: false
                }))
            }
        } catch (error) {

        }
    },

    deleteTask: async (taskId) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_URL}/task/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res.ok) {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== taskId),
                    loading: false,
                }))
            }
        } catch (err) {

        }
    },

    getTasksByStatus: (status) => {
        if (status === "all") return get().tasks;
        return get().tasks.filter((t) => t.category === status);
    },
}));
