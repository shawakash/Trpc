import { z } from "zod";
import { router } from "../trpc";
import protectedProcedure from "../procedures/protectedProceduer";
import publicProcedure from "../procedures/publicProcedure";


export const todoInput = z.object({
    title: z.string(),
    description: z.string()
});

export const todoRouter = router({
    createTodo: protectedProcedure
        .input(todoInput)
        //@ts-ignore
        .mutation(async ({ ctx, input }) => {
            const { id, prisma } = ctx;
            console.log(id)
            const { title, description } = input;
            const todo = await prisma.todo.create({
                data: {
                    title,
                    description,
                    User: {
                        connect: {
                            id
                        }
                    }
                }
            });
            return todo;
        }),
    getTodo: publicProcedure
    //@ts-ignore
        .query(async (opt) => {
            const todos = await opt.ctx.prisma.user.findUnique({
                where: {
                    id: 2
                },
                select: {
                    Todo: true
                }
            });
            return todos;
        }),
});
