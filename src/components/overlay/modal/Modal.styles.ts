import styled from "styled-components";

import { colors } from "@/styles/colors";
import { Flex } from "@/components/layout/flex/Flex";

export const ModalOverlay = styled(Flex)`
  position: fixed;
  z-index: 9999;
  inset: 0;

  align-items: center;
  justify-content: center;

  padding: 24px;

  background-color: rgb(0 0 0 / 40%);
  backdrop-filter: blur(2px);
`;

export const ModalBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 90vh;
  border-radius: 8px;

  background: ${colors.backgroundCard};
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 10%),
    0 4px 6px -4px rgb(0 0 0 / 10%);

  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled(Flex)`
  padding: 16px 24px;
  border-bottom: 1px solid ${colors.borderLight};
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 24px;
`;

export const ModalFooter = styled(Flex)`
  padding: 16px 24px;
  border-top: 1px solid ${colors.borderLight};
  background-color: ${colors.backgroundHover};
`;

export const IconWrapper = styled(Flex)<{
  $type?: "default" | "danger" | "info";
}>`
  width: 40px;
  height: 40px;
  border-radius: 8px;

  color: ${({ $type }) =>
    $type === "danger" ? colors.danger : colors.primary};

  background-color: ${({ $type }) =>
    $type === "danger" ? colors.dangerLight : colors.primaryLight};
`;
