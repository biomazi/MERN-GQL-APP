import React from 'react';
import { ApolloProvider } from '@apollo/client';
import styled, { createGlobalStyle } from 'styled-components';

import client from './apollo';
import Main from './containers/Main';

const GlobalStyle = createGlobalStyle`
  body, *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Segoe UI', 'Roboto','Ubuntu','Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Main />
  </ApolloProvider>
);

export default App;
