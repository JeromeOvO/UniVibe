import React from "react";
import { useState } from "react";

function DropdownMenu({ onChange }) {
  const [option, setOption] = useState("");

  const handleOptionChange = (event) => {
    // this.setState({ selectedOption: event.target.value });
    console.log(event.target.value);
    setOption(event.target.value);

    onChange(event.target.value);
  };
  const hanldClick = (event) => {
    // console.log(event.target.value);
    // change(event.target.value);
  };
  return (
    <div>
      <select
        id="dropdown"
        value={option}
        onChange={handleOptionChange}
        style={{ color: "rgba(103,105,109,255)" }}
      >
        <option value="">Latest</option>
        <option value="oldest" onClick={() => hanldClick()}>
          Oldest
        </option>
        <option value="popular" onClick={() => hanldClick()}>
          Popular
        </option>
      </select>
    </div>
  );
}

export default DropdownMenu;
