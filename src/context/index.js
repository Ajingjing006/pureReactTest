import { createContext } from "react";
export const colorContext = createContext("默认颜色");
export const ageContext = createContext("默认年龄");

//测试动态context功能
export const publicContext = createContext({}); //默认值
export const publicContext2 = createContext({}); //默认值
