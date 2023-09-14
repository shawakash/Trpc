import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
//@ts-ignore
export default trpc.withTRPC(MyApp);