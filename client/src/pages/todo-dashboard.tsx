import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  toggleTodoStatus,
  updateTodo,
} from "../api/todo-api";
import { useState } from "react";

export default function TodoDashboard() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleTodoStatusMutation = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Add New Todo</h1>
          <div className="flex gap-3">
            <input
              id="todo-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm"
            />
            <button
              className="bg-neutral-800 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => addTodoMutation.mutate({ title })}
            >
              Add todo
            </button>
          </div>
        </div>

        <h1 className="text-lg font-medium">Your Todos</h1>

        <div className="space-y-4">
          {todos?.map((todo) => (
            <div key={todo._id} className="space-y-2 rounded-md border p-4">
              <p className="text-sm font-medium">{todo.title}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-3 py-1 bg-neutral-800 text-white rounded text-xs"
                  onClick={() => deleteTodoMutation.mutate({ id: todo._id })}
                >
                  Delete
                </button>

                <button
                  className="px-3 py-1 bg-neutral-200 rounded text-xs"
                  onClick={() => {
                    const newTitle = prompt("Enter new title", todo.title);
                    if (newTitle) {
                      updateTodoMutation.mutate({
                        id: todo._id,
                        title: newTitle,
                      });
                    }
                  }}
                >
                  Update
                </button>

                <button
                  className="px-3 py-1 bg-neutral-200 rounded text-xs"
                  onClick={() => {
                    toggleTodoStatusMutation.mutate({ id: todo._id });
                  }}
                >
                  Mark as complete
                </button>

                <span className="text-xs">
                  {todo?.isCompleted ? "Completed" : "Not completed"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {addTodoMutation.isError && (
          <p className="text-red-500 text-xs">
            {addTodoMutation.error.message}
          </p>
        )}

        {deleteTodoMutation.isError && (
          <p className="text-red-500 text-xs">
            {deleteTodoMutation.error.message}
          </p>
        )}
      </div>
    </>
  );
}
