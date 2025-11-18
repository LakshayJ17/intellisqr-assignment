// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAllTodos } from "../api/todo-api";

export default function TodoDashboard() {
    // const {data : todos , isLoading, isError, error} = useQuery({
    //     queryKey: ["todos"],
    //     queryFn : getAllTodos
    // })

  return (
    <>
    <div>
        <h1>Your Todos</h1>

        {/* {todos.map((todo) => (
            <p key={todo.id}>{todo.title}</p>
        ))} */}
    </div>
    </>
  )
}
