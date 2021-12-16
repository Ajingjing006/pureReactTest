import { DEL_CELL, PASTE_CELL, UPDATE_CELL_CONTENT } from "../actionType";
const reducer = (prevState, { type, payload }) => {
  let _data = JSON.parse(JSON.stringify(prevState.tableList));
  switch (type) {
    case DEL_CELL:
      //删除操作
      const { selectedCells } = payload;
      if (selectedCells.length === 1) {
        const dom0 = selectedCells[0].split("x");
        _data[dom0[0]][dom0[1]].content = "";
      } else if (selectedCells.length === 2) {
        const dom0 = selectedCells[0].split("x");
        const dom1 = selectedCells[1].split("x");
        _data.forEach((cells, rowIndex) => {
          cells.forEach((cell, cellIndex) => {
            if (
              ((rowIndex >= dom0[0] && rowIndex <= dom1[0]) ||
                (rowIndex >= dom1[0] && rowIndex <= dom0[0])) &&
              ((cellIndex >= dom0[1] && cellIndex <= dom1[1]) ||
                (cellIndex >= dom1[1] && cellIndex <= dom0[1]))
            ) {
              cell.content = "";
            }
          });
        });
      }
      return {
        ...prevState,
        tableList: _data,
      };
    case PASTE_CELL:
      //粘贴操作
      let { baseRow, baseColumn, dataList } = payload;
      baseRow = Number(baseRow);
      baseColumn = Number(baseColumn);

      const rL = _data.length;
      dataList.forEach((row, _r) => {
        row.forEach((cell, _c) => {
          if (
            baseRow + _r < rL &&
            baseColumn + _c < _data[baseRow + _r].length
          ) {
            _data[baseRow + _r][baseColumn + _c] = cell;
          }
        });
      });
      return {
        ...prevState,
        tableList: _data,
      };
    case UPDATE_CELL_CONTENT:
      //更新单元个的内容
      const { key, val } = payload;
      const col_row = key.split("x");
      _data[col_row[0]][col_row[1]].content = val;
      return {
        ...prevState,
        tableList: _data,
      };
    default:
      return prevState;
  }
};

export default reducer;
