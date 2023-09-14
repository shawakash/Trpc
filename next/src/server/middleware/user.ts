import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

export const isUser = middleware(async (opts) => {
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