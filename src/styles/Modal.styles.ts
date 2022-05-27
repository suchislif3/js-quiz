import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.palette.common.black}90`};
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-height: 80%;
  width: 500px;
  max-width: 90vw;
  min-width: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.background.main};
  border: 1px solid
    ${({ theme }) => `${theme.palette.background.contrastText}80`};
  padding: 20px;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  overflow: auto;
`;
