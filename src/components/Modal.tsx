import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  ModalContainer,
  ModalOverlay,
  ModalContent,
} from "../styles/Modal.styles";
import { Button } from "../styles/common.styles";

interface Props {
  children: JSX.Element;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>{children}</ModalContent>
        <Button noMargin onClick={onClose}>OK</Button>
      </ModalContainer>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
