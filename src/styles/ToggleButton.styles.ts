import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  height: 30px;
  width: 25px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

interface Props {
  isDark: boolean;
}

export const Front = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  opacity: ${({ isDark }) => (isDark ? 1 : 0)};
  color: ${({ theme }) => theme.palette.background.main};
  padding: 5px;
  transition: all 0.5s;
  background: ${({ theme }) => `${theme.palette.primary.main}`};
  transform: ${({ isDark }) =>
    isDark ? "translateY(0) rotateX(0)" : "translateY(50%) rotateX(90deg)"};
`;

export const Back = styled.div<Props>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: ${({ isDark }) => (isDark ? 0 : 1)};
  color: ${({ theme }) => theme.palette.background.main};
  padding: 5px;
  transition: all 0.5s;
  background: ${({ theme }) => `${theme.palette.secondary.main}`};
  transform: ${({ isDark }) =>
    isDark ? "translateY(-50%) rotateX(90deg)" : "translateY(0) rotateX(0)"};
`;
