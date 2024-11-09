// pages/_app.tsx
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Optionally, add Bootstrap CSS globally

// Here you can add global styles, context providers, etc.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
