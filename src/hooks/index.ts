import { useMemo, ReactNode } from "react";
import { findChildrenByType } from "@/helpers";
import { ComponentFunction } from "@/types";

export function useChildrenOfType(
  componentFunction: ComponentFunction,
  children?: ReactNode
) {
  const childrenOfType = useMemo(
    () => findChildrenByType(componentFunction, children),
    [componentFunction, children]
  );

  return childrenOfType;
}

export function useChildOfType(
  componentFunction: ComponentFunction,
  children?: ReactNode
) {
  const childrenOfType = useChildrenOfType(componentFunction, children);

  return childrenOfType[0] || null;
}
