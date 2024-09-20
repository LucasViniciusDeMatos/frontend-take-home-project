import React, { useState } from "react";
import { usePopper } from "react-popper";
import { HexColorPicker } from "react-colorful";
import { useStateValues } from "src/modules/StateProvider";
import { CHANGE_PROPERTY } from "@/reducers/reducer";
import styles from "./styles.module.css";

const ColorPicker = () => {
  const { state, dispatch } = useStateValues();
  const [open, setOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement
  );

  const handleChangeColor = (color: string) => {
    dispatch({
      type: CHANGE_PROPERTY,
      payload: { key: "color", value: color },
    });
  };

  return (
    <>
      <button
        className={styles.tool}
        style={{ backgroundColor: state.color }}
        ref={setReferenceElement}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          ref={setPopperElement}
          style={{ ...popperStyles.popper, zIndex: 100 }}
          {...attributes.popper}
        >
          <div className={styles.colorPicker}>
            <HexColorPicker color={state.color} onChange={handleChangeColor} />
          </div>
        </div>
      )}
    </>
  );
};

export default ColorPicker;
