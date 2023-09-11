import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY5NDQ0OTMzM30.1YqBetJoRxeS8hB7xD9ZJWA77SLXtAz1Gp-eBX2mPhE"
        }
      },
    }),
  ],
});

async function main() {
    const user = await trpc.todo.createTodo.mutate({
        title: "Loving It",
        description: "Yeah I need only myself"
    });
    console.log(user);
    
}

main();