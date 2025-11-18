import {z} from "zod"

const todoSchema = z.object({
    _id : z.string(),
    title : z.string(),
    isCompleted : z.boolean()
})

export default todoSchema