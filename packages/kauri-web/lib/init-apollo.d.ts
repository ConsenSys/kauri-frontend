import { ApolloClient } from "apollo-client";

interface IOptions {
  getToken: () => string;
  hostName: string;
}

export function create(initialState: any, options?: IOptions): ApolloClient<{}>;

export default function initApollo(
  initialState: any,
  options: IOptions
): ApolloClient<{}>;
