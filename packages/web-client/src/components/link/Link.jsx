import React, { useState } from 'react';
import { TextInputField, Button } from 'evergreen-ui';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import Error from 'components/error/Error';

const addLinkGQL = loader('graphql/addLink.gql');
const allLinksGQL = loader('graphql/allLinks.gql');

const StyledContainer = styled.div`
  width: 30%;
  margin: 20px auto 40px auto;
`;

const Link = () => {
  const [formData, setFormData] = useState({
    url: '',
    tags: '',
  });
  const [addLinkMutation, { data, error }] = useMutation(addLinkGQL);

  const handleChange = e => {
    e.persist();
    setFormData(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await addLinkMutation({
      variables: formData,
      refetchQueries: [{ query: allLinksGQL }],
    }).catch(err => console.log(err));
    console.log('link added!');
    console.log(response);
    setFormData({
      url: '',
      tags: '',
    });
  };

  return (
    <StyledContainer>
      <Error error={error} />
      <TextInputField
        name="url"
        label="Link"
        placeholder="Enter Link"
        onChange={e => handleChange(e)}
        value={formData.url}
      />
      <TextInputField
        name="tags"
        label="Tags"
        placeholder="Add tags"
        onChange={e => handleChange(e)}
        value={formData.tags}
      />
      <Button
        intent="none"
        onClick={() => handleSubmit()}
      >
        Add Link
      </Button>
    </StyledContainer>
  );
};

export default Link;
