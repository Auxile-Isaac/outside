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
          <title>Your App Title</title>
          {/* You can include other meta tags and links here */}
        </Head>
        <Script
          id="google-maps-script"
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
        />
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
}
