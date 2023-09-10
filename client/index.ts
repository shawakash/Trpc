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
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvbmpvdXIiLCJpYXQiOjE2OTQzMjc2Njh9.n7j_mjlyKY4rHaM5cEoySKY8DMaDuu6vMvPUwqyZQ24"  // localstorage
        }   
      }
    }),
  ],
});

const main = async () => {
    
    const user = await trpc.signup.mutate({
        username: 'Bonjour2',
        password: 'French'
    });
    console.log(user)
}

main();
