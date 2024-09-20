import React, { useRef } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { v4 } from "uuid";
import Node from "./node";
import { useStateValues } from "src/modules/StateProvider";
import { ADD_LINE, ADD_TEXT, UPDATE_NODE } from "src/reducers/reducer";
import { IPen, IEraser } from "src/interfaces/state";
import styles from "./styles.module.css";

const Drawing = () => {
  const { state, dispatch } = useStateValues();
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const point = e.target.getStage()?.getPointerPosition() || { x: 0, y: 0 };
    const initial = { id: v4(), type: state.selectedTool };
    if (state.selectedTool === "text") {
      isDrawing.current = false;
      dispatch({
        type: ADD_TEXT,
        payload: {
          ...initial,
          text: "",
          fontSize: state.fontSize,
          color: state.color,
          x: point.x,
          y: point.y,
        },
      });
    } else {
      isDrawing.current = true;
      const updated =
        state.selectedTool === "pen" ? { color: state.color } : {};
      dispatch({
        type: ADD_LINE,
        payload: {
          ...initial,
          ...updated,
          points: [point.x, point.y],
          strokeWidth: state.strokeWidth,
        },
      });
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || !state.nodes.length) {
      return;
    }
    const point = e.target.getStage()?.getPointerPosition() || { x: 0, y: 0 };
    const lastNode = state.nodes[state.nodes.length - 1];
    const newPoints = [
      ...(lastNode as IPen | IEraser).points,
      point.x,
      point.y,
    ];
    dispatch({
      type: UPDATE_NODE,
      payload: { key: lastNode.id, value: { points: newPoints } },
    });
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = false;
    if (!state.nodes.length) {
      return;
    }
    const lastNode = state.nodes[state.nodes.length - 1];
    if (lastNode.type === "text") {
      return;
    }
    const points = (lastNode as IPen | IEraser).points;
    if (points.length === 2) {
      dispatch({
        type: UPDATE_NODE,
        payload: {
          key: lastNode.id,
          value: { points: [...points, points[0] + 1, points[1] + 1] },
        },
      });
    }
  };

  return (
    <Stage
      width={600}
      height={400}
      className={styles.drawingContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {state.nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Drawing;
