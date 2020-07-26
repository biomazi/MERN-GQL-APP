import React, { useState } from 'react';
import Register from 'components/register/Register';
import Login from 'components/login/Login';
import { Button } from 'evergreen-ui';
import styled from 'styled-components';
import Error from 'components/error/Error';

const StyledContainer = styled.div`
  width: 30%;
  margin: 40px auto;

`;

const StyledWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const UserInfo = () => {
  const [login, setLogin] = useState(true);
  const [serverError, setServerError] = useState(null);
  return (
    <StyledContainer>
      <StyledWrapper>
        <Button
          appearance="primary"
          intent="success"
          onClick={() => setLogin(state => !state)}
        >
          Switch to
          {' '}
          {login ? 'Register' : 'Login'}
        </Button>
        {serverError && <Error error={serverError} />}
      </StyledWrapper>
      {login
        ? <Login setServerError={setServerError} />
        : <Register setLogin={setLogin} />}
    </StyledContainer>
  );
};

export default UserInfo;
