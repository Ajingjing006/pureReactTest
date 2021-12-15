import {
  CHANGE_INPUT_VALUE,
  ADD_ITEM,
  DELETE_ITEM,
} from "../store/actionTypes";
const defaultState = {
  inputValue: "123",
  data: [1, 3, 99],
};
const reducer = (state = defaultState, action) => {
  const type = action.type;
  switch (type) {
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value,
      };
    case ADD_ITEM:
      return {
        data: [...state.data, action.value],
        inputValue: "",
      };
    case DELETE_ITEM:
      const newList = [...state.data];
      newList.splice(action.value, 1);
      return {
        ...state,
        data: newList,
      };
    default:
      return state;
  }
};

export default reducer;
