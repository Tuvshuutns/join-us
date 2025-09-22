import React, { forwardRef } from "react";

export const FormInput = forwardRef(
  (
    { label, value, onChange, error, onKeyDown, placeholder, type = "text" },
    ref
  ) => {
    return (
      <div>
        <p>
          {label} <span className="required">*</span>
        </p>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder || `Your ${label}`}
          value={type !== "file" ? value : undefined}
          onChange={onChange}
          className={error ? "error" : "form-input"}
          onKeyDown={onKeyDown}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
);
