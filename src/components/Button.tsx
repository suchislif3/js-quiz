import React from "react";
import { ButtonDiv } from "../styles/Button.styles";

interface Props {
  callback: () => void;
  children: JSX.Element;
}

const Button: React.FC<Props> = ({ children, callback }) => {
  return <ButtonDiv onClick={callback}>{children}</ButtonDiv>;
};

export default Button;
