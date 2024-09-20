import React from "react";
import { useStateValues } from "src/modules/StateProvider";
import { CHANGE_PROPERTY } from "src/reducers/reducer";
import { IToolbarTool } from "src/interfaces/toolbar";
import styles from "./styles.module.css";

interface ToolbarToolProps {
  tool: IToolbarTool;
}

const ToolbarTool: React.FC<ToolbarToolProps> = ({ tool }) => {
  const { state, dispatch } = useStateValues();

  const handleClick = () => {
    dispatch({
      type: CHANGE_PROPERTY,
      payload: { key: "selectedTool", value: tool.type },
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.tool} ${
        state.selectedTool === tool.type ? styles.selected : ""
      }`}
    >
      <tool.Icon />
    </button>
  );
};

export default ToolbarTool;
