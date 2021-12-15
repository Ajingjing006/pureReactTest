import { useEffect, useState } from "react";
import { getColor } from "../../utils";
const Cell = (props) => {
  const { content, editing, selected, dataKey } = props;
  const {
    cellTurnToEditingMode,
    cellClickHandler,
    onMouseDownCell,
    onMouseOverCell,
    onMouseUpCell,
    clearEditeMode,
    changeCellContent,
  } = props;
  const [bgColor, setBgColor] = useState(getColor(content));
  const [editStr, setEditStr] = useState(content);
  useEffect(() => {
    setEditStr(content);
    if (!editing) {
      setBgColor(getColor(content));
    } else if (editStr !== content) {
      changeCellContent(dataKey, editStr);
    }
  }, [props]);
  return (
    <div
      data-key={dataKey}
      className={selected ? "e-cell selected" : "e-cell"}
      style={{
        background: bgColor,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (selected) {
          //选中的情况下，重新点击，进入编辑模式
          cellTurnToEditingMode(dataKey);
        } else {
          cellClickHandler(dataKey); //没有选中进行选择操作
          cellTurnToEditingMode("");
        }
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDownCell(dataKey);
      }}
      onMouseMove={(e) => {
        e.stopPropagation();
        onMouseOverCell(dataKey);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        onMouseUpCell(dataKey);
      }}
    >
      {editing ? (
        <div>
          <input
            className="cellInput"
            autoFocus
            onChange={(e) => {
              setEditStr(e.target.value);
            }}
            onBlur={(e) => {
              clearEditeMode();
              changeCellContent(dataKey, editStr);
            }}
            value={editStr}
          />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default Cell;
