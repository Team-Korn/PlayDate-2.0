import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  align-text: center;
  align-content: center;
  justify-content: center;
`;

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  align-text: center;
  align-content: center;
  justify-content: center;
`;

const Styledh1 = styled.h1`
  display: flex;
  align-self: flex-start;
  line-height: 0.5;
  color: #f7eddb;
`;
const Styledh3 = styled.h3`
  display: flex;
  color: black;
  line-height: 0.1;
  color: #f7eddb;
`;

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: absolute;
  bottom: 0;
  &:hover {
    color: #8fd0ff;
  }
`;

const StyledLeftHeader = styled.div`
  display: flex;
  width: 33%;
  justify-content: flex-start;
`;

const StyledRightHeader = styled(StyledLeftHeader)`
  display: flex;
  justify-content: flex-end;
`;

const EndOfDeck = () => {
  return (
    <div className="tindercards cardContent">
      <div className="tinderCards__cardContainer">
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')`,
          }}
          className="swipeCard"
        >
          <StyledMessageWrapper>
            <Styledh1>RUH ROH!</Styledh1>
          </StyledMessageWrapper>
          <StyledMessage>
            <Styledh3>Can't fetch any more friends</Styledh3>
          </StyledMessage>
          <StyledLeftHeader>
            <StyledLink to="/user">
              <h3 style={{ marginLeft: '150%' }}>Profile</h3>
            </StyledLink>
          </StyledLeftHeader>
          <StyledRightHeader>
            <StyledLinksWrapper>
              <StyledLink to="/chat">
                <h3 style={{ marginLeft: '260%' }}>Messages</h3>
              </StyledLink>
            </StyledLinksWrapper>
          </StyledRightHeader>
        </div>
      </div>
    </div>
  );
};

export default EndOfDeck;
