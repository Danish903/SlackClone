import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
// import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes/Route";
import getClient from "./apollo-client/apolloClient";

const client = getClient();
const jsx = (
   <ApolloProvider client={client}>
      <Routes />
   </ApolloProvider>
);
ReactDOM.render(jsx, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
