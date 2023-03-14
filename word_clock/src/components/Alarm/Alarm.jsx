import './Alarm.css';

import AlarmColor from "./AlarmColor";

export default function Alarm() {
  return (
    <>
    <app-box class="config">
      <h1>Alarm</h1>
      <AlarmColor />
    </app-box>


    <app-box class="alarm">
      <div id="alarmCard">
        <div class="switch">
          <div>
            <div>
              <h3>Alarm Event Configuration</h3>
            </div>
            <div>
              <input type="time" id="timePicker" step="300" style={{marginRight: 30}} /> 
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
                // onClick="setAlarm(this)"
                id="alarmButton"
                value="Set Alarm"
                class="button"
              />
              <p></p>
              <hr width="90%" />
              <div>
                <h3>Alarm Event Overview</h3>
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
                // onClick="deleteAlarm(this)"
                id="alarmDeleteButton"
                value="Delete Alarm"
                class="button"
              />
            </div>
           
          </div>
        </div>
      </div>
      <p></p>
    </app-box>
    </>
  );
}
