import { FunctionComponent, JSXElementConstructor } from "react";

export type ComponentFunction =
  | JSXElementConstructor<unknown>
  | FunctionComponent<unknown>
  | FunctionComponent<Element>;
