import { isUser } from "../middleware/user";
import { t } from "../trpc";

// export const protectedProcedure = t.procedure.use(isUser);
const publicProcedure = t.procedure;
export default publicProcedure;   // helps to create a endpoint

