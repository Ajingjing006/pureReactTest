import { useContext, useEffect, useRef, useState } from "react";
import { getColor, getColorMapping } from "../../utils";
import { CellContext } from "../../context/index";
const Cell = (props) => {
  const { content, editing, selected, dataKey } = props;
  const ref1 = useRef(); //绑定dom
  const PrivateComponent = useContext(CellContext);
  const {
    cellTurnToEditingMode,
    cellClickHandler,
    onMouseDownCell,
    onMouseOverCell,
    onMouseUpCell,
    clearEditeMode,
    changeCellContent,
  } = props;
  const [bgColor, setBgColor] = useState(
    getColor(getColorMapping("table1"), content)
  );
  const [editStr, setEditStr] = useState(content);
  useEffect(() => {
    setEditStr(content);
    if (!editing) {
      setBgColor(getColor(getColorMapping("table1"), content));
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
      onPointerDown={(e) => {
        console.log(2, e);
      }}
      onClick={(e) => {
        console.log(4, e);
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
            onKeyUp={(e) => {
              if (e.key.toLowerCase() === "enter") {
                e.target.blur();
              }
            }}
            value={editStr}
          />
        </div>
      ) : PrivateComponent ? (
        <PrivateComponent value={content} refx={ref1} />
      ) : (
        content
      )}
    </div>
  );
};

export default Cell;
