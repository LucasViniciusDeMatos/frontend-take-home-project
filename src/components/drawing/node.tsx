import React from "react";
import { Line as KonvaLine } from "react-konva";
import Text from "./text";
import { INode, IPen, IText } from "src/interfaces/state";

interface NodeProps {
  node: INode;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  if (node.type === "text") {
    return <Text text={node as IText} />;
  }

  return (
    <KonvaLine
      points={(node as IPen).points}
      stroke={(node as IPen).color || "#fff"}
      strokeWidth={(node as IPen).strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={
        node.type === "eraser" ? "destination-out" : "source-over"
      }
    />
  );
};

export default Node;
