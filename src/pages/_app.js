import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </SessionProvider>
  );
}

export default MyApp;
