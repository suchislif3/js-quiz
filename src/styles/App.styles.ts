import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  gap: 26px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.palette.primary.main};
  margin: 20px;
`;

export const Score = styled.p`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.palette.secondary.main};
`;
