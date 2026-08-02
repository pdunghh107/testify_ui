import styled from "styled-components";

import { Text } from "../../../components/common/text";
import { Flex } from "../../../components/layout/flex";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundHover};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressFill = styled.div<{ $progress: number; $isError: boolean }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.success};
  transition:
    width 0.3s ease-in-out,
    background-color 0.3s ease;
`;

interface Props {
  current: number;
  total: number;
  hasError?: boolean;
}

export function ProgressBar({ current, total, hasError = false }: Props) {
  const percent =
    total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="space-between" align="center">
        <Text variant="smallSemibold" color="textMuted">
          Tiến trình Test
        </Text>
        <Text variant="smallSemibold" color={hasError ? "danger" : "success"}>
          {current} / {total} ({percent}%)
        </Text>
      </Flex>
      <ProgressBarContainer>
        <ProgressFill $progress={percent} $isError={hasError} />
      </ProgressBarContainer>
    </Flex>
  );
}
