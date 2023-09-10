import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const todoInput = z.object({
    title: z.string(),
    description: z.string()
});

const appRouter = router({
    createTodo: publicProcedure
        .input(todoInput)
        .mutation(async (opt) => {
            const { title, description } = opt.input;
            const todo = await client.todo.create({
                data: {
                    title,
                    description,
                    User: {
                        connect: {
                            id: 2
                        }
                    }
                }
            });
            return todo;
        })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;