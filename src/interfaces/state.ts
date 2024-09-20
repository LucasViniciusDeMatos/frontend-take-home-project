export type INodeType = "pen" | "text" | "eraser";

export interface IBaseNode {
  id: string;
  type: INodeType;
}

export type IPen = IBaseNode & {
  points: number[];
  color: string;
  strokeWidth: number;
};

export type IText = IBaseNode & {
  text: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
};

export type IEraser = IBaseNode & {
  points: number[];
  strokeWidth: number;
};

export type INode = IPen | IText | IEraser;

export interface IState {
  selectedTool: INodeType;
  fontSize: number;
  color: string;
  strokeWidth: number;
  editingText: string;
  nodes: INode[];
}

export type IAction<T = any> = {
  type: string;
  payload?: T;
};
