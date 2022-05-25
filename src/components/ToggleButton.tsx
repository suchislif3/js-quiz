import React from "react";
import { Wrapper, Back, Front } from "../styles/ToggleButton.styles";

interface Props {
  callback: () => void;
  isDark: boolean;
  front: JSX.Element;
  back: JSX.Element;
}

const ToggleButton: React.FC<Props> = ({ callback, isDark, front, back }) => {
  return (
    <Wrapper onClick={callback}>
      <Front isDark={isDark}>{front}</Front>
      <Back isDark={isDark}>{back}</Back>
    </Wrapper>
  );
};

export default ToggleButton;
