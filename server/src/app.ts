import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Routes 
import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todos", todoRouter)

export { app }