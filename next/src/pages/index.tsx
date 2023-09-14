import Image from 'next/image'
import { Inter } from 'next/font/google'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const hello = trpc.hello.useQuery({ text: 'Hola' });
  const todos = trpc.todo.getTodo.useQuery();
  const signup = trpc.user.signup.useMutation({
    onSuccess: (data) => {
      //@ts-ignore
      const {token, message} = data;
      if(token) {
        sessionStorage.setItem('token', token);
      }
      if(message) {
        alert(message)
      }
    },
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <div className="">{hello.data?.greeting}</div> */}
      {todos.isFetched && todos.data?.Todo.map(todo => <div key={todo.id}>{todo.title}</div>)}
      <button onClick={() => {
        const user = signup.mutate({
          username: 'Hola22',
          password: 'Kaise hO'
        });
      }}>Signup</button>
    </main>
  )
}
