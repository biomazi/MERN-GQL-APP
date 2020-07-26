import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { TextInputField, Button } from 'evergreen-ui';

const registerGQL = loader('graphql/register.gql');

const Register = ({ setLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
  });
  const [registerMutation, { data }] = useMutation(registerGQL);

  const handleChange = e => {
    e.persist();
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await registerMutation({
      variables: formData,
    });
    console.log('register worked!');
    console.log(response);
    setLogin(true);
  };

  return (
    <div>
      <TextInputField
        name="username"
        label="User Name"
        placeholder="Username"
        onChange={e => handleChange(e)}
        value={formData.username}
      />
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
      <TextInputField
        name="firstname"
        label="First Name"
        placeholder="First Name"
        onChange={e => handleChange(e)}
        value={formData.firstname}
      />
      <TextInputField
        type="text"
        name="lastname"
        placeholder="Last Name"
        label="Last Name"
        onChange={e => handleChange(e)}
        value={formData.lastname}
      />
      <Button
        intent="none"
        onClick={() => handleSubmit()}
      >
        Register
      </Button>
    </div>
  );
};

export default Register;
