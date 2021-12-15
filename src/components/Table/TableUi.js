import Cell from "./Cell";
const TableUi = (props) => {
  return (
    <div className="e-table">
      {props.rows.map((row, _r) => {
        return (
          <div className="e-row" key={_r}>
            {row.map((cell, _c) => {
              const dataKey = `${_r}x${_c}`;
              return (
                <Cell
                  key={dataKey}
                  dataKey={dataKey}
                  selected={dataKey === props.selectedCell}
                  editing={dataKey === props.reClickedCell}
                  content={cell.content}
                  {...props}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TableUi;
