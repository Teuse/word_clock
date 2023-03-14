import { useState } from "react";
import Toggle from "../Toggle/Toggle.jsx";
import "./Configuration.css";

export default function MiscConfig() {
  const [advancedConfig, setAdvancedConfig] = useState(false);

  return (
    <>
      <h3>Miscellaneous</h3>
      <div class="box">
        <div class="box-entry" style={{ marginBottom: "-8px" }}>
          Advanced Config
          <div class="box-value">
            <Toggle
              isOn={advancedConfig}
              onChangee={() => setAdvancedConfig(!advancedConfig)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
