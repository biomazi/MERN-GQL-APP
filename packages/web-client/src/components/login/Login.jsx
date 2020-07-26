import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { TextInputField, Button } from 'evergreen-ui';
import styled from 'styled-components';

const loginGQL = loader('graphql/login.gql');
const meGQL = loader('graphql/me.gql');

const StyledContainer = styled.div`
  margin: 20px auto 40px auto;
`;

const Login = ({ setServerError }) => {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });
  const [loginMutation, { data }] = useMutation(loginGQL);

  const handleChange = e => {
    e.persist();
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await loginMutation({
      variables: formData,
      refetchQueries: [{ query: meGQL }],
    }).catch(e => setServerError(e));
    console.log('login worked!');
    console.log(response);
  };

  return (
    <StyledContainer>
      <TextInputField
        name="email"
        label="Email"
        placeholder="Email"
        onChange={e => handleChange(e)}
        value={formData.email}
      />
      <TextInputField
        name="password"
        label="Password"
        placeholder="Password"
        onChange={e => handleChange(e)}
        value={formData.password}
      />
      <Button
        intent="none"
        onClick={() => handleSubmit()}
      >
        Login
      </Button>
    </StyledContainer>
  );
};

export default Login;
