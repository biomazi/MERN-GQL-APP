import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import UserInfo from 'components/user/UserInfo';
import Logout from 'components/logout/Logout';
import Error from 'components/error/Error';
import LinkContainer from './LinkContainer';

const meGQL = loader('graphql/me.gql');

const StyledContainer = styled.div`
  padding: 20px 10%;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #66ccff;
`;

const Main = () => {
  const { data, loading, error } = useQuery(meGQL);

  if (loading) return <div>Loading...</div>;

  return (
    <StyledContainer>
      <StyledTitle>Symphony app</StyledTitle>
      {data?.me && (
        <>
          <Logout />
          <LinkContainer />
        </>
      )}
      {!data?.me && <UserInfo />}
      <Error error={error} />
    </StyledContainer>
  );
};
export default Main;
