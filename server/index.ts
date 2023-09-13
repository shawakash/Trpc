import { z } from 'zod';
import { router, ContextType } from './trpc';
import { PrismaClient } from '@prisma/client';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { todoRouter } from './routers/todo';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRouter } from './routers/user';
import publicProcedure from './procedures/publicProcedure';
import cors from 'cors';

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
    middleware: cors(),
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

        /**
         * return new Promise<ContextType>(resolve => {
         *      jwt.verify(token, SECRET, (err, decoded) => {
         *          if(err || typeof decoded == 'string') {
         *              resolve({
         *                  id: undefined,
         *                  prisma: new PrismaClient()
         *              })
         *          }
         *          resolve({
         *              id: decoded.id,
         *              prisma: new PrismaClient()
         *          })
         *          
         * })
         * })
         */
    }
});

server.listen(3000);