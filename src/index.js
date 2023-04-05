import React from "react";
import ReactDOM from "react-dom/client";
import UserBox from "./components/UserBox";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3039/graphql",
  cache: new InMemoryCache({
    dataIdFromObject: (data) => {
      if (typeof data === "object" && data.hasOwnProperty("success")) {
        console.log(data, "ini data full");
      }
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserBox />
    </ApolloProvider>
  </React.StrictMode>
);
