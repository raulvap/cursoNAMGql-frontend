// Lesson74: instalando y configurando Apollo Dev Tools
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import "../styles/globals.css";
// Lesson 120: agreando el state a toda la app:
import PedidoState from "../context/pedidos/PedidoState";

function MyApp({ Component, pageProps }) {
   // Lesson 73: configurando Apollo Client
   // Este es el index.js, la página principal de NextJs

   return (
      <ApolloProvider client={client}>
         <PedidoState>
            <Component {...pageProps} />
         </PedidoState>
      </ApolloProvider>
   );
}

export default MyApp;
