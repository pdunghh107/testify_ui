import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import * as React from "react";

import { type SelectOptionType, SelectProvider } from "./SelectContext";

export interface SelectRootProps {
  children: React.ReactNode;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  options: SelectOptionType[];
  placement?: Placement;
  disabled?: boolean;
}

export function SelectRoot({
  children,
  value,
  onChange = () => {},
  multiple = false,
  options,
  placement = "bottom-start",
  disabled = false,
}: SelectRootProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // Find selected index for single select (to manage focus when opened)
  const initialSelectedIndex = React.useMemo(() => {
    if (!multiple && value) {
      const idx = options.findIndex((o) => o.value === value);
      return idx >= 0 ? idx : null;
    }
    return null;
  }, [value, multiple, options]);

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    initialSelectedIndex,
  );

  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = React.useRef<number | null>(null);

  // Sync activeIndex to ref for navigation
  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open,
    onOpenChange: (isOpen) => {
      if (disabled) return;
      setOpen(isOpen);
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight, 300)}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 150,
    initial: {
      opacity: 0,
      transform: "translateY(-4px) scale(0.98)",
    },
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation],
  );

  return (
    <SelectProvider
      value={{
        open,
        setOpen,
        activeIndex,
        setActiveIndex,
        selectedIndex,
        setSelectedIndex,
        getItemProps,
        activeIndexRef,
        listRef,
        value,
        onChange,
        multiple,
        options,
      }}
    >
      {/* We use a div wrapper to pass the floating context props to children implicitly if needed, but 
          in Compound Components, children use hooks to get context. We'll pass the refs to Trigger/Dropdown. */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass floating context props to Trigger and Dropdown
          if (
            (child.type as { displayName?: string }).displayName ===
            "SelectTrigger"
          ) {
            return React.cloneElement(child, {
              ref: refs.setReference,
              ...getReferenceProps(),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
          }
          if (
            (child.type as { displayName?: string }).displayName ===
            "SelectDropdown"
          ) {
            const childElement = child as React.ReactElement<{
              style?: React.CSSProperties;
              isMounted?: boolean;
              floatingStyles?: any;
              transitionStyles?: any;
            }>;
            return React.cloneElement(childElement, {
              ref: refs.setFloating,
              style: childElement.props.style,
              floatingStyles,
              transitionStyles,
              isMounted,
              ...getFloatingProps(),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
          }
        }
        return child;
      })}
    </SelectProvider>
  );
}
