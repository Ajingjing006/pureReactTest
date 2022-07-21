import tinycolor from "tinycolor2";
export const getDecimalColor = ({ min, max }, decimal) => {
  const lightness =
    max === min ? 50 : 100 - ((90 - 10) * ((decimal - min) / (max - min)) + 10);
  return tinycolor(`hsl(210, 100%, ${lightness}%)`);
};
