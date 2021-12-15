import { getData, setData } from "../test_data";
const clickHandler = () => {
  console.log("1", getData());
  setData(Date.now());
  console.log("2", getData());
};
const Button = (props) => (
  <button onClick={clickHandler}>{props.children}</button>
);

export default Button;
