import { IconType } from "react-icons";
import { INodeType } from "./state";

export interface IToolbarTool {
  type: INodeType;
  Icon: IconType;
}

export interface IStroke {
  value: number;
  width: string;
}

export interface IFontSize {
  value: number;
  label: string;
}
