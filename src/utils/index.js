export const isPlainObject = (obj) => {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  let proto = obj;
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
};

//获取限额内的数字
const getRandomWithLimit = (limit) => {
  return Math.round(Math.random() * limit);
};

//随机颜色
const createRandomColor = () => {
  return `rgba(${getRandomWithLimit(255)}, ${getRandomWithLimit(
    255
  )},${getRandomWithLimit(255)}, 0.2)`;
};

const colorMapping = new Map(); //存储颜色和值的映射表

//获取数值对应的颜色，如果不存在，就
export const getColor = (val) => {
  if (val.length === 0) return "none";
  let color = colorMapping.has(val)
    ? colorMapping.get(val)
    : createRandomColor();
  colorMapping.set(val, color);
  return color;
};

//返回颜色关系表
export const getColorMapping = () => {
  return colorMapping;
};
