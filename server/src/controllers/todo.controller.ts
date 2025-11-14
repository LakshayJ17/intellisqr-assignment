import { Todo } from "../models/todo.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";

const addTodo = asyncHandler(async (req, res) => {
    const { title } = req.body

    if (!title) {
        throw new ApiError(400, "Title is required")
    }

    const todo = await Todo.create({ title, user: req.user?._id })

    return res.status(201).json(new ApiResponse(201, todo, "Todo created successfully"))
})

const updateTodo = asyncHandler(async (req, res) => {
    const todoId = req.params.id
    const { title } = req.body

    if (!title) {
        throw new ApiError(400, "Title is required")
    }

    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, user: req.user?._id },
        { title },
        { new: true })

    if (!updatedTodo) {
        throw new ApiError(404, "Todo not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedTodo, "Todo updated successfully"))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const todoId = req.params.id

    const deletedTodo = await Todo.findOneAndDelete(
        { _id: todoId, user: req.user?._id }
    )

    if (!deletedTodo) {
        throw new ApiError(404, "Todo not found")
    }

    return res.status(200).json(new ApiResponse(200, deletedTodo, "Todo deleted successfully"))
})

const updateCompletionStatus = asyncHandler(async (req, res) => {
    const todoId = req.params.id

    const todo = await Todo.findOne({ _id: todoId, user: req.user?._id })

    if (!todo) {
        throw new ApiError(404, "Todo not found")
    }

    todo.isCompleted = !todo.isCompleted
    await todo.save()

    return res.status(200).json(new ApiResponse(200, todo, "Todo status changed successfully"))

})

const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user?._id }).sort({ createdAt: -1 })

    return res.status(200).json(new ApiResponse(200, todos, "Todos fetched successfully"))
})

export { addTodo, updateTodo, deleteTodo, updateCompletionStatus, getAllTodos }