import type {
  ReactNode,
  FunctionComponent,
  JSXElementConstructor,
} from "react";
import { useMemo } from "react";
import {
  findChildrenByType,
  getReactComponentDisplayName,
  getReactElementType,
} from "../helpers";
import { isNull, isString } from "@migudevelop/types-utils";
import {} from "react";
/**
 * Returns the childs matching the provided function component
 * @param componentFunction function component
 * @param children react node
 * @returns array
 * @example useChildrenOfType(Child, children)
 */
export function useChildrenOfType(
  componentFunction:
    | JSXElementConstructor<unknown>
    | FunctionComponent<unknown>
    | FunctionComponent<Element>,
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
 * @returns node
 * @example useChildOfType(Child, children)
 */
export function useChildOfType(
  componentFunction:
    | JSXElementConstructor<unknown>
    | FunctionComponent<unknown>
    | FunctionComponent<Element>,
  children?: ReactNode
) {
  const childrenOfType = useChildrenOfType(componentFunction, children);

  return childrenOfType[0] || null;
}

/**
 * Throws an error if the children don't match the provided function components
 * @param componentFunctions function components
 * @param children react node
 * @returns the first child
 * @example useCheckChildrenTypes([Child, OtherChild], children)
 */
export function useCheckChildrenTypes(
  componentFunctions: Array<
    | JSXElementConstructor<unknown>
    | FunctionComponent<unknown>
    | FunctionComponent<Element>
  >,
  children?: ReactNode
) {
  if (!children) {
    return;
  }
  const childrenArray = Array.isArray(children) ? children : [children];
  childrenArray.forEach((child) => {
    const elementContructor = getReactElementType(child);
    if (isNull(child) || child === false) {
      return;
    }
    if (
      !elementContructor ||
      isString(elementContructor) ||
      !componentFunctions.includes(elementContructor)
    ) {
      throw new Error(
        `Invalid child type ${getReactComponentDisplayName(child)}. Expected one of ${componentFunctions.map(getReactComponentDisplayName).join(", ")}`
      );
    }
  });
}
