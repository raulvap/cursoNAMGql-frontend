// Lesson 73: configurango Apollo Client
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
   connectToDevTools: true,
   cache: new InMemoryCache(),
   link: new HttpLink({
      // es donde está el servidor backend de Apollo:
      uri: "http://localhost:4000/",
      fetch,
   }),
});

export default client;
