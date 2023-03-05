import React from "react";
import "./Settings.css";

export default function Settings() {
  return (
    <settings>
      <p class="card-title"> Calender </p>
      <div class="switch">
        <input
          type="file"
          id="readfile"
          onchange="readFile(this)"
          // style="display:none"
          accept=".ics"
          multiple="multiple"
        />
        <input
          type="button"
          value="Set Calender Data"
          onclick="document.getElementById('readfile').click()"
          class="button"
        />
        <p></p>
        <input
          type="button"
          value="Delete Calender Data"
          onclick="deleteICS(this)"
          class="button"
        />
      </div>
      <hr width="90%" />
      <p class="card-title"> Store & Load </p>
      <div class="switch">
        <input
          type="button"
          onclick="updateButton(this)"
          id="button1"
          value="Load Default Configuration"
          class="button"
        />
      </div>
      <p></p>
      <div class="switch">
        <input
          type="button"
          onclick="updateButton(this)"
          id="button2"
          value="Store As Default Configuration"
          class="button"
        />
      </div>
      <p></p>
    </settings>
  );
}
