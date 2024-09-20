import React, { useRef } from "react";
import { Group, Text as KonvaText } from "react-konva";
import Konva from "konva";
import { Html } from "react-konva-utils";
import { useStateValues } from "@/modules/StateProvider";
import { UPDATE_NODE, LEAVE_EDIT } from "src/reducers/reducer";
import { IText } from "src/interfaces/state";
import styles from "./styles.module.css";

interface TextProps {
  text: IText;
}

const Text: React.FC<TextProps> = ({ text }) => {
  const { state, dispatch } = useStateValues();

  const isEditing = state.editingText === text.id;
  const editingStyles: React.CSSProperties = {
    top: text.y,
    left: text.x,
    fontSize: text.fontSize + "px",
    color: text.color,
  };

  const handleChange = (value: string) => {
    dispatch({
      type: UPDATE_NODE,
      payload: { key: text.id, value: { text: value } },
    });
  };

  const handleBlur = () => {
    dispatch({ type: LEAVE_EDIT });
  };

  return (
    <Group>
      <KonvaText
        text={text.text}
        x={text.x}
        y={text.y}
        fill={text.color}
        fontSize={text.fontSize}
        visible={!isEditing}
      />
      {isEditing && (
        <Html>
          <input
            autoFocus
            placeholder="Type here..."
            className={styles.textInput}
            style={{ ...editingStyles }}
            value={text.text}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlur();
              }
            }}
          />
        </Html>
      )}
    </Group>
  );
};

export default Text;
