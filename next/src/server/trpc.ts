import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export type ContextType = {
    id?: number,
    prisma: PrismaClient
}

export const t = initTRPC.context<ContextType>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;