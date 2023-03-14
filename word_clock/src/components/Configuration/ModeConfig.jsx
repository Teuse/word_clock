import { useState } from "react";
import "./Configuration.css";

export default function ModeConfig() {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <>
      <h3>Color Mode</h3>
      <table class="box">
        <tr onClick={() => setSelectedMode(0)}>
          <td>
            One Color 
            {selectedMode === 0 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
        <hr class="separator" />
        <tr onClick={() => setSelectedMode(1)}>
          <td>
            Rainbow Pixel
            {selectedMode === 1 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
        <hr class="separator" />
        <tr onClick={() => setSelectedMode(2)}>
          <td>
            Rainbow Word
            {selectedMode === 2 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
      </table>
    </>
  );
}
