import { useState } from "react";
import "./Configuration.css";

export default function ColorConfig() {
  const [clockColor, setClockColor] = useState("#FFFFFF");
  const [transitionColor, setTransitionColor] = useState("#FFFFFF");
  const [brightnes, setBrightnes] = useState(20);

  return (
    <div class="box">
      <div class="box-entry">
        Clock Color
        <span class="color">
          <input
            type="color"
            onChange={(event) => setClockColor(event.target.value)}
            id="color1"
            value={clockColor}
          />
        </span>
      </div>
      <hr class="separator" />
      <div class="box-entry">
        Transition Color
        <span class="color">
          <input
            type="color"
            onChange={(event) => setTransitionColor(event.target.value)}
            id="color1"
            value={transitionColor}
          />
        </span>
      </div>
      <hr class="separator" />
      <div class="box-entry">
        Brightness <div class="box-value">{brightnes}%</div>
      </div>
      <input
        type="range"
        onChange={(event) => setBrightnes(event.target.value)}
        id="slider1"
        min="0"
        max="100"
        step="1"
        // value={brightnes}
        class="slider"
      />
    </div>
  );
}
