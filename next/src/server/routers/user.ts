import { z } from "zod";
import { router } from "../trpc";
import jwt, { JwtPayload } from 'jsonwebtoken';
import publicProcedure from "../procedures/publicProcedure";

export const signupType = z.object({
    username: z.string(),
    password: z.string()
});

export const SECRET = 'client';

export const userRouter = router({
    signup: publicProcedure
        .input(signupType)
        //@ts-ignore
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
})