import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@material-tailwind/react";
import Head from 'next/head';
import Script from 'next/script';


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      
      <ClerkProvider {...pageProps}>
        <Head>
       <Script
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var g = document.createElement('script');
          g.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBzN9QQjSZRS865tiM5bWwclv1kwngPvh0&libraries=places';
          g.async = true;
          g.defer = true;
          document.head.appendChild(g);
        })();
      `,
    }}
  ></Script>
      </Head>
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
}
