import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../utils/trpc';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        //@ts-ignore
        httpBatchLink({
          url: 'http://localhost:3000',

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: `Bearer ${localStorage.getItem('token')}`,
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
        hi there
        <button onClick={async () => {
          // const response = await trpcClient. 
        }} ></button>
        <Signup />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const Signup = () => {
  //@ts-ignore
  const user = trpc.getTodo.useQuery();
  // const user = trpc.todo
  console.log(user.data?.Todo)
  // const use = trpc.user.
  return (
    <>
      signup
      {user.isFetched && user.data?.Todo.map(todo => <h1>{todo.title}</h1>)}
    </>
  )
}