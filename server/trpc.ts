import { PrismaClient } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';

/**
 * Initialization of tRPC backend
 * Define the type for context = Different for different adapter
 * Should be done only once per backend!
 */
const t = initTRPC.context<{
    id?: number,
    prisma: PrismaClient
}>().create();


/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;   // Similar yo app in express
export const publicProcedure = t.procedure;   // helps to create a endpoint
export const middleware = t.middleware;

const isUser = middleware(async (opts) => {
    const { ctx } = opts;
    const isUser = await ctx.prisma.user.findUnique({
        where: {
            id: ctx.id
        }
    });

    if (!isUser) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            id: isUser.id
        }
    })
})

export const protectedProcedure = t.procedure.use(isUser);