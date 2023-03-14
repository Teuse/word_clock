import React from "react";
import "./Settings.css";

export default function Settings() {
  return (
    <app-box class="settings">
      <h1>Settings</h1>
      <h3>Calender</h3>
      <div class="switch">
        <input
          type="file"
          id="readfile"
          onChange="readFile(this)"
          // style="display:none"
          accept=".ics"
          multiple="multiple"
        />
        <br /><br />
        <input
          type="button"
          value="Set Calender Data"
          onClick="document.getElementById('readfile').click()"
          class="button"
        />
        <p></p>
        <input
          type="button"
          value="Delete Calender Data"
          onClick="deleteICS(this)"
          class="button"
        />
      </div>
      <hr width="90%" />
      <h3>Store & Load</h3>
      <div class="switch">
        <input
          type="button"
          onClick="updateButton(this)"
          id="button1"
          value="Load Default Configuration"
          class="button"
        />
      </div>
      <p></p>
      <div class="switch">
        <input
          type="button"
          onClick="updateButton(this)"
          id="button2"
          value="Store As Default Configuration"
          class="button"
        />
      </div>
      <p></p>
    </app-box>
  );
}
