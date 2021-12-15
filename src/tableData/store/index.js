import { createStore } from "redux";
import reducer from "../reducer";
const initData = {
  tableList: [
    [{ content: "" }, { content: 2 }, { content: 1 }],
    [{ content: 99 }, { content: "" }, { content: 5 }],
    [{ content: 12 }, { content: 14 }, { content: "" }],
    [{ content: 1 }, { content: 2 }, { content: 1 }],
    [{ content: 99 }, { content: 77 }, { content: 5 }],
    [{ content: 12 }, { content: 14 }, { content: "" }],
  ],
};
export const store = createStore(reducer, initData);
