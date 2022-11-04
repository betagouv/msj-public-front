// Copyright (c) 2021 #dataESR
import React, { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import dataAttributes from "shared/utils/data-attributes";

import "@gouvfr/dsfr/dist/component/checkbox/checkbox.css";

interface CheckboxProps {
  className?: classNames.Argument;
  id: string;
  disabled?: boolean;
  hint?: any;
  label: string;
  message?: string;
  messageType?: "error" | "valid";
  size?: "sm" | "md";
}

/**
 *
 * @visibleName Checkbox
 */
const Checkbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement> = null) => {
    const {
      className = "",
      hint = "",
      id = null,
      disabled = undefined,
      size = "md",
      messageType = "",
      message = "",
      label,
    } = props;
    const computedClassName = classNames(
      "fr-checkbox-group",
      {
        [`fr-checkbox-group--${messageType}`]: messageType,
        "fr-checkbox-group--sm": size !== "md",
      },
      className
    );
    const checkboxId = useRef(id || uuidv4());

    useEffect(() => {
      checkboxId.current = id || uuidv4();
    }, [id]);

    return (
      <div className={computedClassName}>
        <input
          type="checkbox"
          id={checkboxId.current}
          name={checkboxId.current}
          disabled={disabled}
          ref={ref}
        />
        <label className="fr-label" htmlFor={checkboxId.current}>
          {label}
          {hint && <span className="fr-hint-text">{hint}</span>}
        </label>
        {message && messageType && (
          <p className={`fr-${messageType}-text`}>{message}</p>
        )}
      </div>
    );
  }
);

export default Checkbox;
