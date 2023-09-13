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
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY5NDQ0OTMzM30.1YqBetJoRxeS8hB7xD9ZJWA77SLXtAz1Gp-eBX2mPhE"  // localstorage
        }   
      }
    }),
  ],
});

const main = async () => {
  
    const user = await trpc.user.signup.mutate({
        username: 'Akash',
        password: 'Indian'
    });
    console.log(user)
}

main();
