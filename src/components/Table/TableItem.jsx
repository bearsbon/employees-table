import React, { useState } from "react";

const TableItem = ({ item, titles }) => {
  const [checked, setChecked] = useState(item.checked);

  return (
    <tr className={checked ? "checked" : ""}>
      <td data-label="checkbox">
        <input
          id={item.id}
          type="checkbox"
          onChange={() => setChecked(!checked)}
        />
      </td>
      <td>{item[titles[0]]}</td>
      <td>{item[titles[1]]}</td>
      <td>{item[titles[2]]}</td>
    </tr>
  );
};

export default TableItem;
