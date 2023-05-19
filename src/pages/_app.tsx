import { AdminLayout, BaseLayout } from '@/layouts';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export type NextApp<P extends AppProps = AppProps> = (props: P) => void;

export const App: NextApp = ({ Component, pageProps }) => {
  const isAdminPage = useRouter().pathname.startsWith('/admin');
  const Layout = isAdminPage ? AdminLayout : BaseLayout;
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
