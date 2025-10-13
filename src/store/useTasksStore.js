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
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/task/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);

            const updatedTask = await res.json();

            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? updatedTask : task
                ),
                loading: false,
            }));
        } catch (err) {
            console.error(err);
            set({ error: err.message, loading: false });
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
    registerUser: async (newUser) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            const createdUser = await res.json();
            set({ loading: false });
            return createdUser;
        } catch (err) {
            console.error(err);
            set({ loading: false, error: err.message });
        }
    },

    loginUser: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const loggedUser = await res.json();
            if (loggedUser && loggedUser.id) {
                localStorage.setItem("user", JSON.stringify(loggedUser));
            }

            set({ loading: false });
            return loggedUser;
        } catch (err) {
            console.error(err);
            set({ loading: false, error: err.message });
        }
    },

}));
