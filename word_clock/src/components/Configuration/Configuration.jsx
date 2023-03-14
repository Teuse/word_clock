import "./Configuration.css";

import ColorConfig from "./ColorConfig";
import FunctionConfig from "./FunctionConfig";
import ModeConfig from "./ModeConfig";
import MiscConfig from "./MiscConfig.jsx";

export default function Configuration() {

  return (
    <app-box class="config">
      <h1>Configuration</h1>
      <ColorConfig />
      <ModeConfig />
      <FunctionConfig />
      <MiscConfig />
    </app-box>
  );
}
