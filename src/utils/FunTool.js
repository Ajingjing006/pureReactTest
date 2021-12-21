//获取一个方法的相反方法
export const negate = (func) => {
  return (...args) => !func.call(null, ...args);
};

//判断值是null
export const isNull = (val) => val === null;

//判断是null 或者 undefined
export const isNill = (val) => val == null;

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

export default {
  negate,
  isNull,
  isNill,
  isPlainObject,
};
