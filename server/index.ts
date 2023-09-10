import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt, { JwtPayload } from 'jsonwebtoken';

const client = new PrismaClient();
const SECRET = 'client';

const todoInput = z.object({
    title: z.string(),
    description: z.string()
});

const signupType = z.object({
    username: z.string(),
    password: z.string()
});

const appRouter = router({
    createTodo: publicProcedure
        .input(todoInput)
        .mutation(async (opt) => {
            const username = opt.ctx.username;
            const isUser = await client.user.findUnique({
                where: {
                    username
                }
            });

            if(!isUser) {
                return {
                    message: 'Forbidden'
                }
            }

            const { title, description } = opt.input;
            const todo = await client.todo.create({
                data: {
                    title,
                    description,
                    User: {
                        connect: {
                            id: isUser.id
                        }
                    }
                }
            });
            return todo;
        })
    ,
    getTodo: publicProcedure
        .query(async (opt) => {
            const todos = await client.user.findUnique({
                where: {
                    id: 2
                },
                select: {
                    Todo: true
                }
            });
            return todos;
        }),

    signup: publicProcedure
        .input(signupType)
        .mutation(async (opts) => {
            const { username, password } = opts.input;
            const isUser = await client.user.findFirst({
                where: {
                    username
                }
            });
            if (isUser) {
                return {
                    message: 'Username Already Exists'
                };
            }
            const user = await client.user.create({
                data: {
                    username,
                    password
                }
            });

            const token = jwt.sign({username}, SECRET);
            return {token};

        }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        const token = opts.req.headers.authorization;
        console.log(token);
        // if(!token) {
        //     return {
        //         message: 'Token Required'
        //     }
        // }
        // const decoded: JwtPayload | string = jwt.verify(token, SECRET);
        // if(typeof decoded == 'string') {
        //     return {
        //         username: undefined
        //     }
        // }
        return {
            username: 'kirat5'
        }
    }
});

server.listen(3000);