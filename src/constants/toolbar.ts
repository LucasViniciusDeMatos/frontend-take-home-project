import { FaPen, FaEraser } from "react-icons/fa";
import { RiInputField } from "react-icons/ri";
import { IToolbarTool, IStroke, IFontSize } from "src/interfaces/toolbar";

export const TOOLS: IToolbarTool[] = [
  {
    type: "pen",
    Icon: FaPen,
  },
  { type: "text", Icon: RiInputField },
  { type: "eraser", Icon: FaEraser },
];

export const STROKE_OPTIONS: IStroke[] = [
  {
    value: 1,
    width: "1px",
  },
  {
    value: 2,
    width: "2px",
  },
  {
    value: 4,
    width: "4px",
  },
  {
    value: 8,
    width: "8px",
  },
  {
    value: 16,
    width: "16px",
  },
];

export const FONT_SIZE_OPTIONS: IFontSize[] = [
  { value: 4, label: "4px" },
  { value: 8, label: "8px" },
  { value: 12, label: "12px" },
  { value: 16, label: "16px" },
  { value: 20, label: "20px" },
];
