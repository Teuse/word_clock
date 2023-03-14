import React from 'react';
import "./Toggle.css";

const Toggle = ({ isOn, onChangee }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={onChangee}
        class="toggle-checkbox"
        id={`toggle-new`}
        type="checkbox"
      />
      <label
        class="toggle-label"
        htmlFor={`toggle-new`}
        style={{ background: !isOn && '#757575' }}
      >
        <span class={`toggle-button`} />
      </label>
    </>
  );
};

export default Toggle;