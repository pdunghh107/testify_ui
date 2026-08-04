import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { Dropdown, DropdownItem } from "@/components/overlay/dropdown/Dropdown";

import { Flex } from "../flex";
import { SidebarAction } from "./SidebarAction";
import {
  SidebarCollapsible,
  SidebarCollapsibleContent,
  SidebarCollapsibleIcon,
  SidebarCollapsibleTrigger,
} from "./SidebarCollapsible";
import { SidebarItem } from "./SidebarItem";

/**
 * Cấu hình Hành động (Actions) cho một Node trong SidebarTree.
 */
export interface ActionConfig<T = any> {
  label: string;
  icon?: React.ElementType;
  variant?: "default" | "danger";
  onClick: (item: T) => void;
  hidden?: boolean;
}

/**
 * Cấu trúc dữ liệu của một Node trong SidebarTree.
 */
export interface SidebarNode {
  id: string;
  label: string;
  icon?: React.ElementType;
  actions?: ActionConfig<SidebarNode>[];
  children?: SidebarNode[];
  originalData?: any;
}

/**
 * Cấu hình Props cho SidebarTree.
 */
export interface SidebarTreeProps {
  data: SidebarNode[];
  activeId?: string | null;
  onNodeSelect?: (id: string, node: SidebarNode) => void;
}

/**
 * Component render đệ quy một cấu trúc thư mục dạng Tree cho Sidebar.
 * Tự động quản lý việc đóng/mở thư mục, hiển thị icon và action phụ (dropdown).
 *
 * @example
 * ```tsx
 * const data = [{ id: '1', label: 'Tài liệu', children: [{ id: '2', label: 'Báo cáo' }] }];
 * 
 * <SidebarTree data={data} activeId="2" onNodeSelect={(id) => console.log(id)} />
 * ```
 */
export function SidebarTree({
  data,
  activeId,
  onNodeSelect,
}: SidebarTreeProps) {
  // Use generic UI state for expanding/collapsing nodes
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderActions = (node: SidebarNode) => {
    if (!node.actions || node.actions.length === 0) return null;

    const visibleActions = node.actions.filter((a) => !a.hidden);
    if (visibleActions.length === 0) return null;

    return (
      <Flex onClick={(e) => e.stopPropagation()}>
        <Dropdown
          trigger={
            <SidebarAction
              icon={<MoreHorizontal size={14} />}
              aria-label="Hành động"
            />
          }
          placement="bottom-end"
          content={(close) => (
            <>
              {visibleActions.map((action, idx) => (
                <DropdownItem
                  key={idx}
                  icon={action.icon}
                  variant={action.variant}
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                    action.onClick(node);
                  }}
                >
                  {action.label}
                </DropdownItem>
              ))}
            </>
          )}
        />
      </Flex>
    );
  };

  const renderNodes = (nodes: SidebarNode[], level: number = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedIds.has(node.id);
      const isActive = activeId === node.id;
      const Icon = node.icon;

      if (node.children && node.children.length > 0) {
        return (
          <SidebarCollapsible
            key={node.id}
            isOpen={isExpanded}
            onToggle={(e) => toggleNode(node.id, e)}
            level={level}
          >
            <SidebarItem
              icon={Icon}
              isActive={isActive}
              level={level}
              onClick={(e) => {
                e.stopPropagation();
                onNodeSelect?.(node.id, node);
                setExpandedIds((prev) => {
                  const next = new Set(prev);
                  next.add(node.id);
                  return next;
                });
              }}
              prefix={
                <SidebarCollapsibleTrigger asChild>
                  <SidebarCollapsibleIcon />
                </SidebarCollapsibleTrigger>
              }
              actions={renderActions(node)}
            >
              {node.label}
            </SidebarItem>
            <SidebarCollapsibleContent>
              {renderNodes(node.children, level + 1)}
            </SidebarCollapsibleContent>
          </SidebarCollapsible>
        );
      }

      return (
        <SidebarItem
          key={node.id}
          icon={Icon}
          isActive={isActive}
          level={level}
          onClick={(e) => {
            e.stopPropagation();
            onNodeSelect?.(node.id, node);
            setExpandedIds((prev) => {
              const next = new Set(prev);
              next.add(node.id);
              return next;
            });
          }}
          actions={renderActions(node)}
        >
          {node.label}
        </SidebarItem>
      );
    });
  };

  return <>{renderNodes(data)}</>;
}
