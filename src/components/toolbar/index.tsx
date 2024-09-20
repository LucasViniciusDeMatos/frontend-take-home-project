import React from "react";
import Select, { SingleValue } from "react-select";
import ToolbarTool from "./toolbarTool";
import ColorPicker from "./colorPicker";
import StrokeSelect from "./strokeSelect";
import { TOOLS } from "src/constants/toolbar";
import { useStateValues } from "src/modules/StateProvider";
import { FONT_SIZE_OPTIONS } from "src/constants/toolbar";
import { IFontSize } from "src/interfaces/toolbar";
import { CHANGE_PROPERTY } from "src/reducers/reducer";
import styles from "./styles.module.css";

const Toolbar = () => {
  const { state, dispatch } = useStateValues();

  const selectedFontSize = FONT_SIZE_OPTIONS.find(
    (option) => option.value === state.fontSize
  );

  const handleFontSizeChange = (selected: SingleValue<IFontSize>) => {
    dispatch({
      type: CHANGE_PROPERTY,
      payload: { key: "fontSize", value: selected?.value },
    });
  };

  return (
    <div className={styles.toolbar}>
      {TOOLS.map((tool) => (
        <ToolbarTool key={tool.type} tool={tool} />
      ))}
      <div className={styles.divider} />
      <ColorPicker />
      <StrokeSelect />
      <Select
        styles={{
          control: (baseStyles) => ({ ...baseStyles, height: "50px" }),
          option: (baseStyles) => ({ ...baseStyles, color: "black" }),
        }}
        value={selectedFontSize}
        options={FONT_SIZE_OPTIONS}
        isSearchable={false}
        isMulti={false}
        onChange={handleFontSizeChange}
      />
    </div>
  );
};

export default Toolbar;
