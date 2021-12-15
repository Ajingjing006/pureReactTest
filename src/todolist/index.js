import React, { Component } from "react";
import store from "../store";
import TodoListUI from "./ui";
import { colorContext, ageContext } from "../context";
import {
  getInputChangeAction,
  getAddItemAction,
  getDeleteItemAction,
} from "../store/actionCreator";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.inputHandler = this.inputHandler.bind(this);
    this.handlerAdd = this.handlerAdd.bind(this);
    this.storeHandleChange = this.storeHandleChange.bind(this);
    this.deleHandler = this.deleHandler.bind(this);

    store.subscribe(this.storeHandleChange);
  }
  //删除一项
  deleHandler(index) {
    store.dispatch(getDeleteItemAction(index));
  }

  //更改输入框内容
  inputHandler(e) {
    store.dispatch(getInputChangeAction(e.target.value));
  }
  storeHandleChange() {
    this.setState(store.getState());
  }
  handlerAdd() {
    if (this.state.inputValue) {
      store.dispatch(getAddItemAction(this.state.inputValue));
    }
  }
  beforeDestroy() {}
  render() {
    return (
      <colorContext.Consumer>
        {(color) => (
          <ageContext.Consumer>
            {(age) => (
              <TodoListUI
                color={color}
                age={age}
                inputValue={this.state.inputValue}
                data={this.state.data}
                inputHandler={this.inputHandler}
                handlerAdd={this.handlerAdd}
                deleHandler={this.deleHandler}
              />
            )}
          </ageContext.Consumer>
        )}
      </colorContext.Consumer>
    );
  }
}
export default TodoList;
