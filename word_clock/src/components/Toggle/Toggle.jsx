import React from "react";
import "./Toggle.css";

const Toggle = ({ id, isOn, onChange }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={onChange}
        class="toggle-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        class="toggle-label"
        htmlFor={id}
        style={{ background: !isOn && "#757575" }}
      >
        <span class={`toggle-button`} />
      </label>
    </>
  );
};

export default Toggle;
