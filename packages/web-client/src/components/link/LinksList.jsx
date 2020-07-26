import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Link, Badge } from 'evergreen-ui';

const allLinksGQL = loader('graphql/allLinks.gql');

const StyledWrapper = styled.div`
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  margin-right: 16px;
  cursor: pointer;
`;

const LinksList = () => {
  const { data, loading, error } = useQuery(allLinksGQL);

  if (!data) return null;

  return (
    <StyledWrapper>
      <ul>
        {data.allLinks.map(link => (
          <div key={link.url}>
            <StyledLink target="_blank." href={link.url} color="blue">{link.url}</StyledLink>
            {link.tags.map(tag => (
              <Badge marginRight={8} isSolid color="green" key={tag}>{tag}</Badge>
            ))}
          </div>
        ))}
      </ul>
    </StyledWrapper>
  );
};

export default LinksList;
