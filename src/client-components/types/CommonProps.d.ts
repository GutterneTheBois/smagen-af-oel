import { ReactNode } from "react";

/**
 * Here we define our props to be used by the "Button" component
 * @REMEMBER to export, otherwise it won't be accessible
 */
export interface CommonProps {
  children?: ReactNode;
  onClick?: () => void;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  justifyContent?: string;
  textAlign?: string;
  alignItems?: string;
  display?: string;
}
