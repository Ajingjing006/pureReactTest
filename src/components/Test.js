import { Component } from "react";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show1: false,
      show2: false,
      errorMsg: props.errorMsg,
      async: !!props.isAsync, //初始化异步状态标记
    };
  }<input type="checkbox" />
 componentDidUpdate(prevProps) {
    const { show1, show2, asyncDone, async } = this.state;
    const { isSaving, isAsync, status } = this.props;<input type="checkbox" />
   if (prevProps === this.props) {
      return;
    }
    //异步结束了就关标记
    let _asyncDone = 0;
    if (isAsync && status) {
      if (status === "ready") {
        _asyncDone = 1;
        if (!async) {
          this.setState({
            async: true,
          });
        }
      } else if (status === "done") {
        _asyncDone = 2;
        if (async) {
          this.setState({
            async: false,
          });
        }
      }
    }
    this.setState({ asyncDone: _asyncDone });<input type="checkbox" />
   //控制显示同步信息
    if (!show1 && isSaving) {
      this.setState({
        show1: true,
      });
    }<input type="checkbox" />
   //显示异步信息
    if (!show2 && isAsync) {
      this.setState({
        show2: true,
      });
    }<input type="checkbox" />
   //控制错误信息时间
    //从没错变有错
    if (!prevProps.errorMsg && this.props.errorMsg) {
      if (asyncDone === 1) {
        //异步过程中
        this.setState({
          lock: true, //限制设置显示errorMsg，只在异步过程中显示一次，异步过程中就不再去重新设置异步信息了
        });
        if (!this.state.lock) {
          //未开限制锁的情况下，设置错误信息
          this.setState({
            errorMsg: this.props.errorMsg,
          });
        }
        setTimeout(() => {
          this.setState({
            errorMsg: "", //只显示4秒错误信息，然后就清掉
          });
        }, 4000);
      } else if (asyncDone === 2) {
        //异步结束了
        this.setState({
          lock: false, //把异步错误信息锁去掉
        });
        setTimeout(() => {
          this.setState({
            show2: false,
          });
        }, 2000);
      } else if (asyncDone === 0) {
        if (this.state.async) {
          //异步过程中出现了同步,不显示同步的正常信息，只考虑出错信息
          this.setState({
            show1: false,
          });
        } else {
          this.setState({
            errorMsg: this.props.errorMsg,
          });
          //纯同步过程报错
          setTimeout(() => {
            this.setState({
              show1: false,
              errorMsg: "",
            });
          }, 1500);
        }
      }
    }
  }
  render() {
    console.log(this.state.show1, this.state.show2);
    if (this.state.show1 || this.state.show2) {
      if (this.state.errorMsg) {
        //优先显示报错信息
        return (
          <div
            style={{
              color: "red",
            }}
          >
            错误信息: {this.state.errorMsg}
          </div>
        );
      } else {
        return <div>正常信息: {this.props.msg}</div>;
      }
    }
    return <div>没有消息</div>;
  }
}

export default Test;
