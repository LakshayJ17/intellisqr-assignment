import { Router } from "express";
import { addTodo, deleteTodo, getAllTodos, updateCompletionStatus, updateTodo } from "../controllers/todo.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const todoRouter = Router()

todoRouter.post("/", verifyJWT, addTodo);
todoRouter.get("/", verifyJWT, getAllTodos);
todoRouter.patch("/:id", verifyJWT, updateTodo);
todoRouter.delete("/:id", verifyJWT, deleteTodo);
todoRouter.patch("/:id/toggle", verifyJWT, updateCompletionStatus);

export default todoRouter