import { useMemo, ReactNode } from "react";
import { findChildrenByType } from "../helpers";
import { ComponentFunction } from "../types";

/**
 * Returns the childs matching the provided function component
 * @param componentFunction function component
 * @param children react node
 * @returns array
 */
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

/**
 * Returns the first child matching the provided function component
 * @param componentFunction function component
 * @param children react node
 * @returns the first child
 */
export function useChildOfType(
  componentFunction: ComponentFunction,
  children?: ReactNode
) {
  const childrenOfType = useChildrenOfType(componentFunction, children);

  return childrenOfType[0] || null;
}
