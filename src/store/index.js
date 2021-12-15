import { createStore } from "redux";
import reducer from "../reducer";
const initState = {
  inputValue: "",
  data: [1, 2, 99],
};
const store = createStore(reducer, initState);

export default store;
