import { z } from 'zod';
import { router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { todoRouter } from './routers/todo';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRouter } from './routers/user';
import publicProcedure from './procedures/publicProcedure';

const SECRET = 'client';


const appRouter = router({
    todo: todoRouter,
    getTodo: publicProcedure
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
    user: userRouter
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