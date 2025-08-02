import { z } from "zod";
import { StatusTask } from "../enum/statusTask.enum";


export const createTaskSchema = z
    .object({
        title: z.string().max(100),
        description: z.string().max(5000),
        status: z.enum(StatusTask)
    }).required().strict();

export type CreateTaskZodDto = z.infer<typeof createTaskSchema>;