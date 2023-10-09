import { FC } from "react";
import { CommonProps } from "../types/CommonProps";
import styles from "./button.module.scss";

/**
 * Example button using vanilla typescript/react
 *
 * @param props
 * @returns JSX.Element
 */
const Button: FC<CommonProps> = (props: CommonProps): JSX.Element => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`${
          props.className ? `${styles.btn} ${props.className}` : styles.btn
        }`}
        style={{
          display: "flex",
          height: props.height ? props.height : "4vh",
          padding: props.padding && props.padding,
          margin: props.margin && props.margin,
          width: props.width ? props.width : "7vw",
          border: props.border ? props.border : `1px solid #5b5b5b`,
          borderRadius: props.borderRadius,
          color: props.color ? props.color : "#000",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "#bcbcbc",
          alignItems: props.alignItems ? props.alignItems : "center",
          justifyContent: props.justifyContent
            ? props.justifyContent
            : "center",
        }}
      >
        {props.children}
      </button>
    </>
  );
};

Button.displayName = "Button";

export default Button;
