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
            console.error(err);
            set({ error: err.message, loading: false });
        }
    },

    getTasksByStatus: (status) => {
        if (status === "all") return get().tasks;
        return get().tasks.filter((t) => t.category === status);
    },
}));
