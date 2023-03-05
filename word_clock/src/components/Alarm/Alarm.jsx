import React from "react";
import './Alarm.css';

export default function Alarm() {
  return (
    <alarm>
      <p class="card-title">Alarm</p>
      <div>
        <p class="card-subtitle">Enable/Disable</p>
        <label class="toggleSwitch">
          <input
            type="checkbox"
            onclick="updateToggleAlarm(this)"
            id="toggleAlarm"
            checked
          />
          <span class="toggle round" />
        </label>
      </div>
      <div id="alarmCard">
        <div class="switch">
          <div>
            <hr width="90%" />
            <div>
              <p class="card-subtitle">Alarm Event Configuration</p>
            </div>
            <div>
              <input type="time" id="timePicker" step="300" /> &nbsp
              <select id="alarmList">
                <option id="Beer" value="0">
                  Beer
                </option>
                <option id="Whisky" value="1">
                  Whisky
                </option>
                <option id="Bed" value="2">
                  Bed
                </option>
                <option id="Sex" value="3">
                  Sex
                </option>
                <option id="Schnaps" value="4">
                  Schnaps
                </option>
                <option id="Wine" value="5">
                  Wine
                </option>
              </select>
              <label id="labelTime" />
            </div>
            <p></p>
            <div>
              <input
                type="button"
                onclick="setAlarm(this)"
                id="alarmButton"
                value="Set Alarm"
                class="button"
              />
              <p></p>
              <hr width="90%" />
              <div>
                <p class="card-subtitle">Alarm Event Overview</p>
              </div>
              <select
                name="alarmListbox"
                id="alarmListbox"
                multiple
                size="10"
              />

              <p></p>
              <input
                type="button"
                onclick="deleteAlarm(this)"
                id="alarmDeleteButton"
                value="Delete Alarm"
                class="button"
              />
            </div>
            <hr width="90%" />
            <div>
              <form id="colorCard2">
                <p class="card-subtitle">
                  Alarm Color
                  <label id="alarmColorValue" />
                </p>
                <p class="switch">
                  <input
                    type="color"
                    onchange="updateColor(this)"
                    id="color2"
                    value="#FFFFFF"
                  />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p></p>
    </alarm>
  );
}
