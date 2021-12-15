//这个表格是用来进行用户选取和复制粘贴的赋值操作
import "./index.css";
import TableUi from "./TableUi";
import Mark from "./SelectionMark";
import { useState, useEffect } from "react";
import { countPostion } from "../../utils/DomTool";
import Legend from "./Legend";

const Table = (props) => {
  const [selectedCell, setSelectedCell] = useState(null); //当前聚焦选中的cell
  const [reClickedCell, setReClickedCell] = useState(null); //当前要编辑的单元格
  const [selectedCells, setSelectedCells] = useState([]); //存储选中的开始和结束的cell
  const [selectMode, setSelectMode] = useState(false); //选择模式标记
  const [showMark, setShowMark] = useState(false); //显示标记
  const [markPosition, setMarkPosition] = useState({}); //标记坐标和宽高
  const [copyCells, setCopyCells] = useState(null); //设置存储的复制数据
  const [mapping, setMapping] = useState(new Map());
  // const
  const rows = props.rows;

  //单元格选中
  const cellClickHandler = (val) => {
    setSelectedCell(val);
  };

  //进行多单元格选中操作设计
  const multiSelectHandler = (key) => {
    if (selectMode) {
      //选择模式下，进行数据的监控控制
      if (selectedCells[0] !== key) {
        setSelectedCells([selectedCells[0], key]); // 设置终止位置
      } else {
        setSelectedCells([key]); // 设置终止位置
      }
    }
  };
  //鼠标按下监控[用来开启选择模式]
  const mouseDownHandler = (key) => {
    setSelectMode(true);
    setSelectedCells([key]);
  };

  //鼠标抬起监控[用来停止选择模式]
  const mouseUpHandler = (key) => {
    setSelectMode(false);
  };

  //复制
  const copyData = () => {
    if (selectedCells.length) {
      //有选中的内容，才能复制
      const cells = [];
      if (selectedCells.length === 1) {
        cells[0] = [
          JSON.parse(JSON.stringify(mapping.get(selectedCells[0]).data)),
        ];
      } else {
        const key1 = selectedCells[0].split("x");
        const key2 = selectedCells[1].split("x");
        const rowStart = Math.min(key1[0], key2[0]);
        const rowEnd = Math.max(key1[0], key2[0]);
        const columnStart = Math.min(key1[1], key2[1]);
        const columnEnd = Math.max(key1[1], key2[1]);
        props.rows.forEach((row, rowIndex) => {
          if (rowIndex >= rowStart && rowIndex <= rowEnd) {
            const rowCells = [];
            row.forEach((cell, cellIndex) => {
              if (cellIndex >= columnStart && cellIndex <= columnEnd) {
                rowCells.push(JSON.parse(JSON.stringify(cell)));
              }
            });
            cells.push(rowCells);
          }
        });
      }
      setCopyCells(cells);
    }
  };

  //粘贴
  const pasteData = () => {
    if (selectedCell) {
      props.pasteData(selectedCell.split("x"), copyCells);
    }
  };

  //监控页面的键盘事件
  //键盘按下
  const keyDownHandler = (e) => {
    const key = e.key.toLowerCase();
    if (e.ctrlKey || e.metaKey) {
      if (key === "c") {
        //复制功能
        copyData();
      } else if (key === "v") {
        //粘贴功能
        pasteData();
      }
    }
    if (key === "backspace") {
      if (!reClickedCell) {
        props.deleteData(selectedCells);
        setSelectedCells([]);
        setSelectedCell(null);
      }
    }
  };

  const documentClickForBlur = (e) => {
    setSelectedCell(null);
  };

  //修改单元格内容
  const changeCellContent = (key, value) => {
    props.updateCellContent(key, value);
  };
  //修改单元格的编辑模式
  const cellTurnToEditingMode = (val) => {
    setReClickedCell(val);
  };
  //去掉编辑模式
  const clearEditeMode = () => {
    setReClickedCell(null);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("click", documentClickForBlur);
    return () => {
      //清理页面的监听事件
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("click", documentClickForBlur);
    };
  });

  //构建数据映射表，便于后期数据查找操作
  useEffect(() => {
    props.rows.forEach((cells, rowIndex) => {
      cells.forEach((cell, cellIndex) => {
        mapping.set(`${rowIndex}x${cellIndex}`, {
          data: cell,
          row: rowIndex,
          cell: cellIndex,
        });
      });
    });
  }, [props]);

  //根据选中的单元格的首位，获取mark的显示状态
  useEffect(() => {
    if (selectedCells.length === 2) {
      setShowMark(true);
      setMarkPosition(countPostion(selectedCells[0], selectedCells[1])); //设置标记的坐标和宽高
    } else {
      setShowMark(false);
    }
  }, [selectedCells]);
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        paddingLeft: "80px",
      }}
    >
      <div className="e-legend-container">
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          图例
        </div>
        <Legend rows={rows} />
      </div>
      <div style={{ position: "relative" }}>
        <TableUi
          rows={rows}
          selectedCell={selectedCell}
          reClickedCell={reClickedCell}
          cellClickHandler={cellClickHandler}
          onMouseOverCell={multiSelectHandler}
          onMouseDownCell={mouseDownHandler}
          onMouseUpCell={mouseUpHandler}
          changeCellContent={changeCellContent}
          cellTurnToEditingMode={cellTurnToEditingMode}
          clearEditeMode={clearEditeMode}
        ></TableUi>
        {showMark ? <Mark {...markPosition} /> : ""}
      </div>
    </div>
  );
};

export default Table;
