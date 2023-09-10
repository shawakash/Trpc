import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
            "Authorization": "Bearer 500"  // localstorage
        }   
      }
    }),
  ],
});

const main = async () => {
    
    const todos = await trpc.createTodo.mutate({
        title: 'Bonjour',
        description: 'French'
    });
    console.log(todos)
}

main();
