import React from 'react';
import { Button } from 'evergreen-ui';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import styled from 'styled-components';

const logoutGQL = loader('graphql/logout.gql');

const StyledWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const Logout = () => {
  const [logoutMutation, { data, client }] = useMutation(logoutGQL);
  const handleClick = async () => {
    const response = await logoutMutation();
    console.log('logout success');
    console.log({ response });
    client.resetStore();
  };

  return (
    <StyledWrapper>
      <Button
        appearance="primary"
        intent="warning"
        onClick={() => handleClick()}
      >
        Logout
      </Button>
    </StyledWrapper>
  );
};

export default Logout;
