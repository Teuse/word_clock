import { useState } from "react";
import "./Configuration.css";

export default function ColorConfig() {
  const [brightnes, setBrightnes] = useState(20);

  return (
    <div class="box">
      <div class="box-entry">
        Clock Color
        <span class="color">
          <input
            type="color"
            onChange="updateColor(this)"
            id="color1"
            value="#FFFFFF"
          />
        </span>
      </div>
      <hr class="separator" />
      <div class="box-entry">
        Transition Color
        <span class="color">
          <input
            type="color"
            onChange="updateColor(this)"
            id="color1"
            value="#FFFFFF"
          />
        </span>
      </div>
      <hr class="separator" />
      <div class="box-entry">
        Brightness <div class="box-value">20%</div>
      </div>
      <input
        type="range"
        onChange={setBrightnes}
        id="slider1"
        min="0"
        max="100"
        step="1"
        value={brightnes}
        class="slider"
      />
    </div>
  );
}
