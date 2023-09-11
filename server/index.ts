import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { todoRouter } from './routers/todo';

const SECRET = 'client';



const signupType = z.object({
    username: z.string(),
    password: z.string()
});

const appRouter = router({
    todo: todoRouter,
    signup: publicProcedure
        .input(signupType)
        .mutation(async (opts) => {
            const { username, password } = opts.input;
            console.log(username)
            const isUser = await opts.ctx.prisma.user.findFirst({
                where: {
                    username
                }
            });
            if (isUser) {
                return {
                    message: 'Username Already Exists'
                };
            }
            const user = await opts.ctx.prisma.user.create({
                data: {
                    username,
                    password
                }
            });

            const token = jwt.sign({ id: user.id }, SECRET);
            return { token };

        }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        const token = opts.req.headers.authorization;
        let id: number | undefined;
        if (token) {
            const decoded: any = jwt.verify(token, SECRET);
            if (typeof decoded == 'string') {
               id = undefined;
            }
            id = decoded.id;
        }
        return {
            id,
            prisma: new PrismaClient()
        }
    }
});

server.listen(3000);