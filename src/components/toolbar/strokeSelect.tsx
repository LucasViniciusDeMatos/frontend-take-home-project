import React from "react";
import Select, { SingleValue } from "react-select";
import { useStateValues } from "src/modules/StateProvider";
import { STROKE_OPTIONS } from "src/constants/toolbar";
import { IStroke } from "src/interfaces/toolbar";
import { CHANGE_PROPERTY } from "src/reducers/reducer";
import styles from "./styles.module.css";

const StrokeSelect = () => {
  const { state, dispatch } = useStateValues();
  const selectedOption = STROKE_OPTIONS.find(
    (option) => option.value === state.strokeWidth
  );

  const handleChange = (selected: SingleValue<IStroke>) => {
    dispatch({
      type: CHANGE_PROPERTY,
      payload: { key: "strokeWidth", value: selected?.value },
    });
  };

  return (
    <Select
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "50px",
          marginRight: "10px",
        }),
        valueContainer: (baseStyles) => ({ ...baseStyles, display: "flex" }),
      }}
      value={selectedOption}
      options={STROKE_OPTIONS}
      isSearchable={false}
      isMulti={false}
      components={{
        Option: ({ innerRef, innerProps, data }) => (
          <div ref={innerRef} {...innerProps} className={styles.strokeItem}>
            <div className={styles.stroke} style={{ height: data.width }} />
          </div>
        ),
        SingleValue: ({ data }) => (
          <div
            className={styles.stroke}
            style={{ height: data.width, width: "50px" }}
          />
        ),
      }}
      onChange={handleChange}
    />
  );
};

export default StrokeSelect;
