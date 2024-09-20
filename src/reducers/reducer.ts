import { IState, IAction } from "src/interfaces/state";

export const ADD_LINE = "ADD_LINE";
export const ADD_TEXT = "ADD_TEXT";
export const UPDATE_NODE = "UPDATE_NODE";
export const CHANGE_PROPERTY = "CHANGE_PROPERTY";
export const LEAVE_EDIT = "LEAVE_EDIT";

const initialState: IState = {
  selectedTool: "pen",
  fontSize: 4,
  color: "#000000",
  strokeWidth: 4,
  editingText: "",
  nodes: [],
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...state,
        editingText: "",
        nodes: [...state.nodes, action.payload],
      };

    case ADD_TEXT:
      return {
        ...state,
        editingText: action.payload.id,
        nodes: [...state.nodes, action.payload],
      };

    case UPDATE_NODE:
      return {
        ...state,
        nodes: [...state.nodes].map((item) =>
          item.id === action.payload.key
            ? { ...item, ...action.payload.value }
            : { ...item }
        ),
      };

    case CHANGE_PROPERTY:
      if (
        action.payload.key === "selectedTool" &&
        state.selectedTool !== action.payload.value
      ) {
        return {
          ...state,
          editingText: "",
          [action.payload.key]: action.payload.value,
        };
      }

      if (
        state.editingText &&
        ["color", "fontSize"].includes(action.payload.key)
      ) {
        const updatedNodes = state.nodes.map((node) =>
          node.id === state.editingText
            ? { ...node, [action.payload.key]: action.payload.value }
            : { ...node }
        );
        return {
          ...state,
          [action.payload.key]: action.payload.value,
          nodes: updatedNodes,
        };
      }
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case LEAVE_EDIT:
      return {
        ...state,
        editingText: "",
      };

    default:
      return { ...state };
  }
};

export { reducer, initialState };
