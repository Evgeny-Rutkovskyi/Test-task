import { z } from "zod";
import { StatusTask } from "../enum/statusTask.enum";


export const updateTaskSchema = z
    .object({
        id: z.number(),
        title: z.string().max(100).optional(),
        description: z.string().max(5000).optional(),
        status: z.enum(StatusTask).optional()
    }).strict();

export type UpdateTaskZodDto = z.infer<typeof updateTaskSchema>;