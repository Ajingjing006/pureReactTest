export const countPostion = (key1, key2) => {
  const dom0 = document.querySelector(`.e-cell[data-key='${key1}']`);
  if (!dom0) {
    return;
  }
  const domBase = dom0.closest(".e-table").getBoundingClientRect();
  const dom1 = dom0.getBoundingClientRect();
  const dom2 = document
    .querySelector(`div[data-key='${key2}']`)
    .getBoundingClientRect();
  let x = 0;
  let y = 0;
  let w = 0;
  let h = 0;

  if (dom1.x < dom2.x) {
    x = dom1.x;
    w = dom2.x + dom2.width - dom1.x;
  } else {
    x = dom2.x;
    w = dom1.x + dom1.width - dom2.x;
  }
  if (dom1.y < dom2.y) {
    y = dom1.y;
    h = dom2.y + dom2.height - dom1.y;
  } else {
    y = dom2.y;
    h = dom1.y + dom1.height - dom2.y;
  }
  x -= domBase.x;
  y -= domBase.y;
  return {
    x,
    y,
    w,
    h,
  };
};
