import { isUser } from "../middleware/user";
import { t } from "../trpc";

const protectedProcedure = t.procedure.use(isUser);
export default protectedProcedure;   // helps to create a endpoint

