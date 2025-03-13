// /* eslint-disable @next/next/no-page-custom-font */
// "use client";

// import dynamic from "next/dynamic";

// const DynamicRootLayout = dynamic(() => import("./layout-root"), {
//   ssr: false,
// });

// export default function RootLayout() {
//   return;
//   <DynamicRootLayout />;
// }
"use client";

import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { store, persistor } from "./store";
import { ModalProvider } from "@/common/context/modal-context";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading...</p>;

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic&display=optional"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <body>
              <RouterProvider router={router} />
            </body>
          </ModalProvider>
        </PersistGate>
      </Provider>
    </html>
  );
}
