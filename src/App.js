import "./App.css";
import { useState } from "react";
import { store } from "./tableData/store";
import {
  getDeleteCellAction,
  getPasteCellAction,
  getUpdateCellAction,
} from "./tableData/actionCreator";
import Table from "./components/Table";
function App() {
  const [data, setData] = useState(store.getState());
  const pasteData = ([baseRow, baseColumn], dataList) => {
    store.dispatch(getPasteCellAction({ baseRow, baseColumn, dataList }));
  };
  const deleteData = (selectedCells) => {
    store.dispatch(getDeleteCellAction({ selectedCells }));
  };
  const updateCellContent = (key, val) => {
    store.dispatch(getUpdateCellAction({ key, val }));
  };

  //redux数据更新，同步更新页面数据
  const storeRefresh = () => {
    setData(store.getState());
  };
  store.subscribe(storeRefresh); //监控store的更新
  return (
    <Table
      rows={data.tableList}
      pasteData={pasteData}
      deleteData={deleteData}
      updateCellContent={updateCellContent}
    ></Table>
  );
}

export default App;
