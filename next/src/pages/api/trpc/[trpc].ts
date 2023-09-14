import * as trpcNext from '@trpc/server/adapters/next';
import { PrismaClient } from '@prisma/client';
import { SECRET } from '@/server/routers/user';
import jwt from 'jsonwebtoken';
// import { appRouter } from '../../../../../server';
import {createNextApiHandler} from '../../../../../server/createNextApiHandler'
import { appRouter } from '@/server/routers/_app';

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: (opts) => {
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

  },
});

// export default createNextApiHandler(appRouter);   // do this in case of monorepo