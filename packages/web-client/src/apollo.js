import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const URL = 'http://localhost:3001/graphql';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: URL,
  credentials: 'include',
});

const client = new ApolloClient({
  cache,
  link,
  name: 'react-web-client',
});

export default client;
