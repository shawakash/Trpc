import { z } from 'zod';
import { procedure, router } from '../trpc';
import { userRouter } from './user';
import { todoRouter } from './todo';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    user: userRouter,
    todo: todoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;