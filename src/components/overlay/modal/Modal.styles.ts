import styled from "styled-components";
import { Flex } from "../../layout/flex/Flex";
import { colors } from "../../../styles/colors";

export const ModalOverlay = styled(Flex)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.backgroundCard};
  border-radius: 8px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled(Flex)`
  padding: 16px 24px;
  border-bottom: 1px solid ${colors.borderLight};
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled(Flex)`
  padding: 16px 24px;
  border-top: 1px solid ${colors.borderLight};
  background-color: ${colors.backgroundHover};
`;

export const IconWrapper = styled(Flex)<{ $type?: "default" | "danger" | "info" }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ $type }) =>
    $type === "danger" ? colors.dangerLight : colors.primaryLight};
  color: ${({ $type }) =>
    $type === "danger" ? colors.danger : colors.primary};
`;
