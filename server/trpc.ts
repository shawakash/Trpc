import { PrismaClient } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
import { isUser } from './middleware/user';

/**
 * Initialization of tRPC backend
 * Define the type for context = Different for different adapter
 * Should be done only once per backend!
 */
export const t = initTRPC.context<{
    id?: number,
    prisma: PrismaClient
}>().create();


/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;   // Similar yo app in express
export const middleware = t.middleware;