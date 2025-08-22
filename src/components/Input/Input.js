import React, { useState } from "react";
import "./Input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({ label, type = "text", value, onChange, error,placeholder="" }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-box">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            let val = e.target.value;

            if (label.toLowerCase().includes("phone")) {
              val = val.replace(/[^0-9+]/g, "");
              if (val.indexOf("+") > 0) val = val.replace("+", "");

              const match = val.match(/^(\+\d{1,3})(\d*)$/);
              if (match) {
                const country = match[1];
                let number = match[2].slice(0, 10); 
                val = country + number;
              }
            }

            onChange(val);
          }}
        />

        {isPassword && (
          <span className="toggle" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </span>
        )}
      </div>
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default Input;
