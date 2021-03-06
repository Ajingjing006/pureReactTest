import "./App.css";
import { useCallback, useMemo, useState } from "react";
import { getDecimalColor } from "./colors";
import { store } from "./tableData/store";
import {
  getDeleteCellAction,
  getPasteCellAction,
  getUpdateCellAction,
} from "./tableData/actionCreator";
import Table from "./components/Table";
import ContextButton from "./components/ContextButton";
import { publicContext, publicContext2, CellContext } from "./context";
import { debounce } from "./utils/FunTool.js";
const ABC = {};
function App(props) {
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
  <input type="checkbox" />;
  //redux数据更新，同步更新页面数据
  const storeRefresh = () => {
    setData(store.getState());
  };
  store.subscribe(storeRefresh); //监控store的更新<input type="checkbox" />
  const fn2 = (...args) => {
    console.log("fn2", ...args);
  };
  <input type="checkbox" />;
  const map = new Map();
  var min = 100;
  var max = 800;
  for (let i = min; i <= max; i++) {
    const res = getDecimalColor({ min, max }, i);
    var s = res.toRgbString();
    if (map.get(s)) {
      console.log(i, map.get(s), s);
    } else {
      map.set(s, i);
    }
    <input type="checkbox" />;
    // if (i % 100 == 0) {
    // console.log(set, set.size);
    // }
  }
  <input type="checkbox" />;
  //测试防抖
  //timer保存不住
  // const clickHandler = useCallback(
  //   (event, fn = debounce(fn2.bind({ a: 1, b: 2 }), 1000)) => {
  //     fn(event);
  //   },
  //   []
  // );<input type="checkbox" />
  //可行，但是有警告
  // const clickHandler = useCallback(debounce(fn2.bind({ a: 1, b: 2 }), 1000), [
  //   props,
  // ]);<input type="checkbox" />
  const fn = useMemo(() => debounce(fn2.bind({ a: 1, b: 2 }), 1000), [props]);
  <input type="checkbox" />;
  const clickHandler = (e) => {
    fn(1, 99, 9);
  };
  <input type="checkbox" />;
  const cellContentComponent = ({ refx, value }) => {
    return (
      <div
        ref={refx}
        onClick={(e) => {
          console.log(3, e);
        }}
        onPointerDown={(e) => {
          console.log(1, e);
        }}
      >
        {value}
      </div>
    );
  };
  <input type="checkbox" />;
  return (
    <div>
      <CellContext.Provider value={cellContentComponent}>
        <Table
          rows={data.tableList}
          pasteData={pasteData}
          deleteData={deleteData}
          updateCellContent={updateCellContent}
        ></Table>
      </CellContext.Provider>
      <hr />
      <publicContext.Provider value={{ name: 1 }}>
        <publicContext2.Provider value={{ name: 2 }}>
          <ContextButton
            publicContext={publicContext}
            publicContext2={publicContext2}
            clickHandler={(val) => {
              console.log(val);
            }}
          >
            点击获取context
          </ContextButton>
        </publicContext2.Provider>
      </publicContext.Provider>
      <publicContext.Provider value={{ name: 111 }}>
        <publicContext2.Provider value={{ name: 2222 }}>
          <ContextButton
            publicContext={publicContext}
            publicContext2={publicContext2}
            clickHandler={(val) => {
              console.log(val);
            }}
          >
            点击获取context2
          </ContextButton>
        </publicContext2.Provider>
      </publicContext.Provider>
      <hr />
      <button onClick={clickHandler}>点击测试防抖</button>
    </div>
  );
}

export default App;
