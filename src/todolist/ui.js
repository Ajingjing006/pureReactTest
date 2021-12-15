import { Component } from "react";

import Button from "../components/Button";
class TodoListUi extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            value={this.props.inputValue}
            onChange={this.props.inputHandler}
          ></input>
          <Button onClick={this.props.handlerAdd}>add</Button>
        </div>
        <ul>
          {this.props.data.map((item, index) => {
            return (
              <li key={index}>
                {item}
                <Button onClick={() => this.props.deleHandler(index)}>
                  del
                </Button>
              </li>
            );
          })}
        </ul>
        <div>
          {this.props.color},{this.props.age}
        </div>
      </div>
    );
  }
}

export default TodoListUi;
