


import React from "react";
import { Slider, Input } from "@material-ui/core/";

export default function DiscreteSlider({ values, handleChange }) {
const [value, setValue] = React.useState(values.areaSpace);

const handleSliderChange = (event, newValue) => {
  setValue(newValue);
};

const handleInputChange = event => {
  setValue(event.target.value === "" ? "" : Number(event.target.value));
};

const handleBlur = () => {
  if (value < 0) {
    setValue(0);
  } else if (value > 100) {
    setValue(100);
  }
};

return (
  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
    <Input
      value={value}
      margin="dense"
      onChange={handleInputChange}
      onBlur={handleBlur}
      inputProps={{
        step: 1,
        min: 0,
        max: 800,
        type: "number",
        "aria-labelledby": "input-slider"
      }}
    />
    <Slider
      style={{ marginTop: "20px" }}
      value={typeof value === "number" ? value : 0}
      onChange={handleSliderChange}
      aria-labelledby="input-slider"
      step={1}
      min={0}
      max={55}
      onChangeCommitted={(event, value) =>
        handleChange("areaSpace")({ target: { value } })
      }
    />
  </div>
);
}
