import { z } from "zod"


export const editedValidation = z.object({
    id:z.string(),
    Title:z.string(),
    Content:z.string(),
    Available:z.boolean(),
    Location:z.string(),
    Address:z.string()
})


export const postingValidation = z.object({
    userId:z.string(),
    Title:z.string(),
    Content:z.string(),
    Available:z.boolean(),
    Location:z.string(),
    Address:z.string()
})
