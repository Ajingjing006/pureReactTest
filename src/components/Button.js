import { data } from "../test_data";
const clickHandler = () => {
  console.log("1", data.name);
  data.name = Date.now();
  console.log("2", data.name);
};
const Button = (props) => (
  <button onClick={clickHandler}>{props.children}</button>
);

export default Button;
