import { useState } from "react";
import Toggle from "../Toggle/Toggle.jsx";
import "./Alarm.css";

export default function AlarmColor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [alarmColor, setAlarmColor] = useState("#ff0000");

  return (
    <div class="box">
      <div class="box-entry" style={{ marginBottom: "-8px" }}>
        Enabled
        <div class="box-value">
          <Toggle
            id="alarmToggle"
            isOn={isEnabled}
            onChange={() => {
              console.log(isEnabled);
              setIsEnabled(!isEnabled);
            }}
          />
        </div>
      </div>

      <hr class="separator" />

      <div class="box-entry">
        Clock Color
        <span class="color">
          <input
            type="color"
            onChange={(event) => setAlarmColor(event.target.value)}
            value={alarmColor}
          />
        </span>
      </div>
    </div>
  );
}
