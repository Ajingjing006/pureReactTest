//生成一个div，带颜色和边框，用来标记选中的元素区域

const Mark = (props) => {
  return (
    <div
      className="e-mark"
      style={{
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
        width: `${props.w}px`,
        height: `${props.h}px`,
      }}
    ></div>
  );
};
export default Mark;
