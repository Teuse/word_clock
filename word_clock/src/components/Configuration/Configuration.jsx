import React from "react";
import "./Configuration.css";

export default function Configuration() {
  return (
    <configuration>
      <br />
      <div class="switch">
        <button onclick="colorModeDropdown()" class="dropbtn" id="ledMode">
          Led Mode
        </button>

        <div id="colorDropdownMenu" class="dropdown-content">
          <input
            type="button"
            onclick="updateColorMode(this)"
            id="dropdown1"
            value="One Color"
            class="dropdown"
          />
          <input
            type="button"
            onclick="updateColorMode(this)"
            id="dropdown2"
            value="Rainbow Pixel"
            class="dropdown"
          />
          <input
            type="button"
            onclick="updateColorMode(this)"
            id="dropdown3"
            value="Rainbow Word"
            class="dropdown"
          />
        </div>
      </div>

      <p>
        <div class="switch">
          <button
            onclick="functionDropdown()"
            class="dropbtn"
            id="functionMode"
          >
            Function
          </button>
          <div id="functionDropdownMenu" class="dropdown-content">
            <input
              type="button"
              onclick="updateFunction(this)"
              id="fdropdown1"
              value="Word Clock"
              class="dropdown"
            />
            <input
              type="button"
              onclick="updateFunction(this)"
              id="fdropdown2"
              value="Fill Color"
              class="dropdown"
            />
            <input
              type="button"
              onclick="updateFunction(this)"
              id="fdropdown3"
              value="Rain"
              class="dropdown"
            />
          </div>
        </div>
        <hr width="90%" />
      </p>
      <p class="card-subtitle">
        Brightness
        <label id="sliderValue1" />
      </p>

      <p class="switch">
        <input
          type="range"
          onchange="updateSlider(this)"
          id="slider1"
          min="0"
          max="100"
          step="1"
          value="0"
          class="slider"
        />
      </p>
      <hr width="90%" />
      <div id="colorCard">
        <p class="card-subtitle">
          General Color
          <label id="colorValue1" />
        </p>
        <p class="switch">
          <input
            type="color"
            onchange="updateColor(this)"
            id="color1"
            value="#FFFFFF"
          />
        </p>
        <hr width="90%" />
      </div>
      <p class="card-subtitle">
        Transition Color
        <label id="colorValue3" />
      </p>
      <p class="switch">
        <input
          type="color"
          onchange="updateColor(this)"
          id="color3"
          value="#FFFFFF"
        />
      </p>
      <hr width="90%" />
      <div>
        <p class="card-subtitle">Advanced Configuration</p>
        <label class="toggleSwitch">
          <input
            type="checkbox"
            onclick="updateToggleAdvancedConfiguration(this)"
            id="toggleCfg"
            unchecked
          />
          <span class="toggle round"></span>
        </label>
      </div>
      <p></p>
    </configuration>
  );
}
