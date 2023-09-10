import { initTRPC } from '@trpc/server';

/**
 * Initialization of tRPC backend
 * Define the type for context = Different for different adapter
 * Should be done only once per backend!
 */
const t = initTRPC.context<{
    username?: string
}>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;   // Similar yo app in express
export const publicProcedure = t.procedure;   // helps to create a endpoint