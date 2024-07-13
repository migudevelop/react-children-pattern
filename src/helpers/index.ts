import {
  isArray,
  isBoolean,
  isNullish,
  isNumber,
  isString,
} from "@migudevelop/types-utils";
import type {
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

const UNKNOWN_DISPLAY_NAME = "unknown";

/**
 * Determines whether a ReactNode has type property
 * @param value Value to check
 * @returns boolean
 */
function hasTypeProperty(
  value: object | ReactElement | ReactPortal | Iterable<ReactNode>
) {
  return Object.prototype.hasOwnProperty.call(value, "type");
}

/**
 * Determines whether a value is a React Element
 * @param node Value to check
 * @returns boolean
 */
export function isReactElement(node: ReactNode): node is ReactElement<unknown> {
  if (
    isNullish(node) ||
    isNumber(node) ||
    isString(node) ||
    isBoolean(node) ||
    isArray(node)
  ) {
    return false;
  }
  return hasTypeProperty(node);
}

/**
 *
 * @param element dom element
 * @returns
 */
export function getReactElementType(
  element: ReactElement<unknown, string | JSXElementConstructor<unknown>>
):
  | string
  | JSXElementConstructor<unknown>
  | FunctionComponent<unknown>
  | undefined {
  return element?.type;
}

export function getReactElementNodeDisplayName(node: ReactNode): string {
  if (!isReactElement(node)) {
    return UNKNOWN_DISPLAY_NAME;
  }
  const type = getReactElementType(node);
  return isString(type)
    ? type
    : (type as FunctionComponent<unknown>)?.displayName ||
        type?.name ||
        UNKNOWN_DISPLAY_NAME;
}

export function getReactComponentDisplayName(
  Component:
    | ReactElement
    | JSXElementConstructor<unknown>
    | FunctionComponent<unknown>
    | FunctionComponent<Element>
): string {
  return Component.name;
}

export function findChildrenByType(
  componentFunction:
    | ReactElement
    | JSXElementConstructor<unknown>
    | FunctionComponent<unknown>
    | FunctionComponent<Element>,
  children?: ReactNode
) {
  if (!children) {
    return [];
  }
  const childrenArray = isArray(children) ? children : [children];
  return childrenArray.filter(
    (child) =>
      getReactElementType(child as ReactElement<unknown>) === componentFunction
  );
}
