interface User {
    email: string;
    password: string;
}

async function registerUser({ email, password }: User) {
    const res = await fetch(`http://localhost:8000/api/v1/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    const output = await res.json()
    if (!res.ok) {
        throw new Error(output.message || "Something went wrong");
    }
    return output.data
}

async function loginUser({ email, password }: User) {
    const res = await fetch(`http://localhost:8000/api/v1/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    const output = await res.json()
    if (!res.ok) {
        throw new Error(output.message || "Something went wrong");
    }
    return output.data
}

export { registerUser, loginUser }