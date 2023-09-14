import { AppRouter, appRouter } from ".";
import * as trpcNext from '@trpc/server/adapters/next';
import jwt from  'jsonwebtoken'
import { SECRET } from "./routers/user";
import { PrismaClient } from "@prisma/client";

export const createNextApiHandler = (router: AppRouter) => {
    return trpcNext.createNextApiHandler({
        router,
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
}