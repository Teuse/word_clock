import { useState } from "react";
import "./Configuration.css";

export default function FunctionConfig() {
  const [selectedFunction, setSelectedFunction] = useState(0);

  return (
    <>
      <h3>Function</h3>
      <table class="box">
        <tr onClick={() => setSelectedFunction(0)}>
          <td>
            Word Clock
            {selectedFunction === 0 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
        <hr class="separator" />
        <tr onClick={() => setSelectedFunction(1)}>
          <td>
            Fill Color
            {selectedFunction === 1 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
        <hr class="separator" />
        <tr onClick={() => setSelectedFunction(2)}>
          <td>
            Rain
            {selectedFunction === 2 && <div class="box-value">&#10004;</div>}
          </td>
        </tr>
      </table>
    </>
  );
}
