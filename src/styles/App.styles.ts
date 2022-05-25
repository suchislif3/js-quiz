import styled from "styled-components";

export const MainContainer = styled.div`
  width: 500px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  gap: 26px;
  position: relative;
`;

export const Title = styled.h1`
  align-self: flex-start;
  font-size: 3rem;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.palette.primary.main};
  margin: 20px 15px;
`;

export const Score = styled.p`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.palette.secondary.main};
`;
