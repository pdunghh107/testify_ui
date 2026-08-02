import type { MouseEvent } from "react";
import styled from "styled-components";

import { Text } from "@/components/common/text";
import { Flex } from "@/components/layout/flex/Flex";
import { useRequestTabStore } from "@/features/workspace/store/requestTabStore";

import { AddTab } from "./AddTab";
import { CloseTab } from "./CloseTab";

const TabBarContainer = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundApp};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  padding: 0 4px;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderDefault};
    border-radius: 4px;
  }
`;

const TabItem = styled(Flex)<{ $active: boolean }>`
  padding: 0 8px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.backgroundCard : "transparent"};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.borderDefault : "transparent"};
  border-bottom: none;
  cursor: pointer;
  min-width: 150px;
  max-width: 200px;
  position: relative;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.backgroundCard : theme.colors.backgroundHover};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme, $active }) =>
      $active ? theme.colors.backgroundCard : "transparent"};
    z-index: 2;
  }
`;

const MethodBadge = styled.span<{ method: string }>`
  font-size: 10px;
  font-weight: 600;
  margin-right: 8px;
  color: ${({ method, theme }) => {
    switch (method) {
      case "GET":
        return theme.colors.primary;
      case "POST":
        return theme.colors.success;
      case "PUT":
        return theme.colors.warning;
      case "DELETE":
        return theme.colors.danger;
      default:
        return theme.colors.textMuted;
    }
  }};
`;

export function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab, addTab } =
    useRequestTabStore();

  const handleCloseTab = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    closeTab(id);
  };

  return (
    <TabBarContainer gap={4}>
      {tabs.map((tab) => (
        <TabItem
          align="center"
          justify="space-between"
          key={tab.id}
          $active={tab.id === activeTabId}
          onClick={() => setActiveTab(tab.id)}
        >
          <Flex align="center" style={{ overflow: "hidden" }}>
            <MethodBadge method={tab.method}>{tab.method}</MethodBadge>
            <TabText variant="smallRegular">{tab.title}</TabText>
          </Flex>

          <CloseTab onClick={(e) => handleCloseTab(e, tab.id)} />
        </TabItem>
      ))}

      <AddTab onClick={() => addTab()} />
    </TabBarContainer>
  );
}

const TabText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
