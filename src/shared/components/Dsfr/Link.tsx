import React, { cloneElement } from "react";
import classNames from "classnames";
import { Icon } from "./Icon";

interface LinkProps {
  className?: classNames.Argument;
  children: JSX.Element;
  href?: string;
  disabled?: boolean;
  verticalIconPosition?: "top" | "middle |sub";
  as?: JSX.Element;
  title?: string;
  target?: string;
  isSimple?: boolean;
  size?: "sm" | "md" | "lg";
  current?: boolean;
  icon?: string;
  onClick?: (e: Event) => void;
  iconPosition?: "left" | "right";
  iconSize?:
    | "fw"
    | "xxs"
    | "xs"
    | "sm"
    | "1x"
    | "lg"
    | "xl"
    | "2x"
    | "3x"
    | "10x";
  display?: "inline" | "flex";
}

/**
 *
 * @visibleName Link
 */
function Link(props: LinkProps) {
  const {
    className: defaultClassname = "",
    disabled = false,
    title = "",
    target = "_self",
    isSimple = false,
    current = false,
    icon = "",
    as = null,
    iconPosition = "right",
    href = "",
    children = "",
    display = "inline",
    verticalIconPosition = "middle",
    iconSize = "sm",
    size = "md",
    onClick,
  } = props;

  const className = classNames(defaultClassname, {
    [`ds-fr--${display}`]: display && icon,
    "fr-link": isSimple,
    [`fr-link--${size}`]: size,
  });
  const onClickLink = (e) => {
    e.preventDefault();
    onClick?.(e);
  };

  const asLink = as
    ? cloneElement(as, {
        className,
        children,
        "aria-current": (current && "page") || undefined,
        onClick,
      })
    : null;

  const linkElement = (
    <a
      aria-disabled={disabled || !href ? true : undefined}
      role={disabled || !href ? "link" : undefined}
      onClick={onClick ? (e) => onClickLink(e) : undefined}
      aria-current={current ? "page" : undefined}
      href={href || undefined}
      title={title || undefined}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
  const element = as ? asLink : linkElement;
  return icon ? (
    <Icon
      verticalAlign={verticalIconPosition}
      name={icon}
      size={iconSize}
      iconPosition={
        element.props && element.props.children ? iconPosition : "center"
      }
    >
      {element}
    </Icon>
  ) : (
    element
  );
}

export default Link;
