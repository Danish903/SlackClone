import React from "react";
import { Query } from "react-apollo";
import { ME_QUERY } from "../graphql/query";
const User = props => (
   <Query query={ME_QUERY}>{payload => props.children(payload)}</Query>
);

export default User;
