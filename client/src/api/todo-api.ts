const BASE_URL = "http://localhost:8000/api/v1/todos"

async function getAllTodos() {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("No auth token found")
    }

    const res = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    const output = await res.json()
    if (!res.ok) {
        throw new Error(output?.message || "Failed to fetch todos");
    }

    return output.data
}

async function addTodo({ title }: { title: string }) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("No auth token found")
    }

    if (!title.trim()) {
        throw new Error("Title is required")
    }

    const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    })

    const output = await res.json()

    if (!res.ok) {
        throw new Error(output?.message || "Failed to add todo");
    }

    return output.data
}

async function updateTodo({ title, id }: { title: string; id: string }) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("No auth token found")
    }

    if (!title.trim()) {
        throw new Error("Title is required")
    }

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    })

    const output = await res.json()

    if (!res.ok) {
        throw new Error(output?.message || "Failed to update todo");
    }

    return output.data
}

async function deleteTodo({ id }: { id: string }) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("No auth token found")
    }

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const output = await res.json()

    if (!res.ok) {
        throw new Error(output?.message || "Failed to delete todo");
    }

    return output.data
}

async function toggleTodoStatus({ id }: { id: string }) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("No auth token found")
    }

    const res = await fetch(`${BASE_URL}/${id}/toggle`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const output = await res.json()
    if (!res.ok) {
        throw new Error(output?.message || "Failed to toggle todo status");
    }
    return output.data
}

export { getAllTodos, addTodo, updateTodo, deleteTodo, toggleTodoStatus }