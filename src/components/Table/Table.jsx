import React, { useEffect, useState } from "react";
import "./table.css";
import TableItem from "./TableItem.jsx";

const Table = ({ data, titles, tableName }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    setItems(data.map((el) => (el = { ...el, checked: false })));
  }, [data]);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const all = document
      .querySelector(`#${tableName}`)
      .getElementsByTagName("input");
    for (let item of all) {
      item.checked = !item.checked;
    }
  };

  const handleCheckbox = (id) => {
    const checkedItem = items.find((el) => el.id === id);
    checkedItem.checked = !checkedItem.checked;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan={5}>
            <input
              id={tableName + "_input"}
              type="checkbox"
              onChange={() => {
                handleSelectAll();
              }}
            />
            <label htmlFor={tableName + "_input"}>Выделить всё</label>
          </th>
        </tr>
      </thead>
      <tbody id={tableName}>
        {items == null ? (
          <tr>
            <td colSpan={5}>No companies</td>
          </tr>
        ) : (
          items.map((el, index) => (
            <TableItem
              key={index}
              checked2={el.checked}
              item={el}
              titles={titles}
              handleCheckbox={handleCheckbox}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
