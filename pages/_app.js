// Lesson74: instalando y configurando Apollo Dev Tools
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
   // Lesson 73: configurando Apollo Client
   // Este es el index.js, la página principal de NextJs

   return (
      <ApolloProvider client={client}>
         <Component {...pageProps} />
      </ApolloProvider>
   );
}

export default MyApp;
