import React from 'react';
import Link from 'components/link/Link';
import LinksList from 'components/link/LinksList';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 40px;
`;

const LinkContainer = () => (
  <StyledContainer>
    <Link />
    <LinksList />
  </StyledContainer>
);

export default LinkContainer;
