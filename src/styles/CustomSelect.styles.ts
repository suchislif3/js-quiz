import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 90%;
`;

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.palette.background.contrastText};
  cursor: pointer;
  user-select: none;

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Content = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.background.contrastText};
  border-top: none;
  position: absolute;
  background: ${({ theme }) => theme.palette.background.main};
  z-index: 1000;
  max-height: 200px;
  overflow: auto;
`;

export const Item = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;

  :hover {
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;
