import { useState, useCallback, useEffect } from "react";
import Test from "./components/Test";

const _syncData = [
  {
    isSaving: true,
    msg: "同步开始",
    status: "ready",
  },
  {
    isSaving: false,
    errorMsg: "同步报错",
    status: "done",
  },
  {
    isSaving: true,
    msg: "同步开始",
    status: "ready",
  },
  {
    isSaving: false,
    msg: "同步结束",
    status: "done",
  },
];

const _asyncDataList = [
  {
    isAsync: true,
    msg: "异步结果1",
    status: "ready",
  },
  {
    isAsync: true,
    msg: "异步结果2",
    status: "ready",
  },
  {
    isAsync: true,
    msg: "异步结果3",
    status: "ready",
  },
  {
    isAsync: true,
    msg: "异步结果4",
    status: "ready",
  },
  {
    isAsync: true,
    msg: "异步结束",
    status: "done",
  },
];

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
function App() {
  const [data, setData] = useState({});
  const [asyncDataList, setAsyncDataList] = useState(_asyncDataList);
  const fn1 = useCallback(async (list, fn) => {
    for (const _data of list) {
      fn({
        isAsync: true,
        msg: "发起异步",
      });
      await sleep(800);
      fn(_data);
      await sleep(1500);
    }
  }, []);
  <input type="checkbox" />;
  useEffect(() => {
    const type = 1;
    switch (type) {
      case 0: //测试同步过程中出现异步
        setTimeout(() => {
          setData(_syncData[0]);
        }, 500);
        setTimeout(() => {
          setData(_syncData[1]);
        }, 2000);
        setTimeout(() => {
          fn1(asyncDataList, setData);
        }, 1000);
        break;
      case 1: //测试异步过程中，出现同步
        fn1(asyncDataList, setData);
        setTimeout(() => {
          setData(_syncData[0]);
        }, 500);
        setTimeout(() => {
          setData(_syncData[1]);
        }, 1000);
        break;
      case 2: //纯同步正常
        setData(_syncData[2]);
        setTimeout(() => {
          setData(_syncData[3]);
        }, 500);
        break;
      case 3: //纯同步报错
        setData(_syncData[0]);
        setTimeout(() => {
          setData(_syncData[1]);
        }, 500);
        break;
      case 4: //纯异步正常
        fn1(asyncDataList, setData);
        break;
    }
  }, [_asyncDataList, _syncData]);
  <input type="checkbox" />;
  return <Test {...data}></Test>;
}
export default App;
