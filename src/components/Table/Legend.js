//生成图例
import { useEffect, useState } from "react";
import { getColorMapping } from "../../utils";
const Legend = (props) => {
  const [_legendmapping, setLegendmapping] = useState([]);
  useEffect(() => {
    const mapping = getColorMapping(props.colorPKey);
    const _map = new Map();
    props.rows
      .flat(2)
      .filter((item) => item.content.toString().length > 0)
      .map((item) => item.content)
      .forEach((key) => {
        _map.set(key, mapping.get(key));
      });
    setLegendmapping(Array.from(_map));
  }, [props]);
  return (
    <ul className="e-legend-ul">
      {_legendmapping.map((item, i) => (
        <li
          className="e-legend-li"
          key={i}
          style={{
            background: item[1],
          }}
        >
          {item[0]}
        </li>
      ))}
    </ul>
  );
};

export default Legend;
