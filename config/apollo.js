// Lesson 73: configurango Apollo Client
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Lesson 82: configurando apollo para autenticar usuarios en la app
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
   // Lesson 82: configurando apollo para autenticar usuarios en la app
   // configuración de hacia dónde nos vamos a conectar, el backend
   uri: "http://localhost:4000/",
   fetch,
});

// Lesson 82: configurando los headers:
const authLink = setContext((_, { headers }) => {
   // Del localstorage verificamos que esté el token:
   const token = localStorage.getItem("token");

   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : "",
      },
   };
});

const client = new ApolloClient({
   connectToDevTools: true,
   cache: new InMemoryCache(),
   link: authLink.concat(httpLink),
   // agregamos el link que creamos arriba con el header:
});

export default client;
