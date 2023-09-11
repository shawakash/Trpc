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
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY5NDMyODUwOH0.fQmNsp0YZaD6biD4zY7L45kyJ_ZOrqNubGHJ3X6dHMQ"  // localstorage
        }   
      }
    }),
  ],
});

const main = async () => {
    
    const todos = await trpc.todo.createTodo.mutate({
        title: 'Bonjour',
        description: 'French'
    });
    console.log(todos)
}

main();
