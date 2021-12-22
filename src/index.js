import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ListCustomer from "./components/ListCustomer";
import Header from "./components/Header";
import "./index.css";

const client = new ApolloClient({
  uri: "https://crm-app.can.canonic.dev/graphql",
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Header />
      <ListCustomer />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
