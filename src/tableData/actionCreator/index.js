import { DEL_CELL, PASTE_CELL, UPDATE_CELL_CONTENT } from "../actionType";

//删除单元格action
export const getDeleteCellAction = (data) => {
  return {
    type: DEL_CELL,
    payload: data,
  };
};

//粘贴单元格action
export const getPasteCellAction = (data) => {
  return {
    type: PASTE_CELL,
    payload: data,
  };
};

//更新单元格内容action
export const getUpdateCellAction = (data) => {
  return {
    type: UPDATE_CELL_CONTENT,
    payload: data,
  };
};
