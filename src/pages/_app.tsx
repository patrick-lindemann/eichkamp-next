import '@/styles/globals.css';
import { AppProps } from 'next/app';

export type NextApp<P extends AppProps = AppProps> = (props: P) => void;

export const App: NextApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
