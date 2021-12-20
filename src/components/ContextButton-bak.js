import { useContext } from "react";
import { publicContext, publicContext2 } from "../context";
const ContextButton = (props) => {
  const data = useContext(publicContext);
  const data2 = useContext(publicContext2);
  return (
    <button
      onClick={() => {
        console.log(11, data.name);
        console.log(22, data2.name);
      }}
    >
      {props.children}
    </button>
  );
};
export default ContextButton;
